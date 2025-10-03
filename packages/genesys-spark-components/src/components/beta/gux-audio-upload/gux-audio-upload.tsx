import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  State
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import type WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';

import { createWavesurfer } from '@utils/audio/create-wavesurfer';

export interface AudioSubmissionData {
  audioBlob: Blob;
}

@Component({
  styleUrl: 'gux-audio-upload.scss',
  tag: 'gux-audio-upload-beta',
  shadow: true
})
export class GuxAudioUpload {
  private wavesurfer: WaveSurfer;
  private record: RecordPlugin;
  private playbackWavesurfer: WaveSurfer;
  private waveformContainer: HTMLDivElement;
  private playbackContainer: HTMLDivElement;

  @Element() root: HTMLElement;

  @State() isRecording: boolean = false;
  @State() isPaused: boolean = false;
  @State() hasRecording: boolean = false;
  @State() isPlaying: boolean = false;
  @State() recordingBlob: Blob;
  @State() recordingTime: string = '00:00';

  @Event() audioSubmit: EventEmitter<AudioSubmissionData>;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.initializeWaveSurfer();
  }

  disconnectedCallback(): void {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
    if (this.playbackWavesurfer) {
      this.playbackWavesurfer.destroy();
    }
  }

  private initializeWaveSurfer(): void {
    this.waveformContainer = this.root.shadowRoot.querySelector('#waveform');
    this.playbackContainer = this.root.shadowRoot.querySelector('#playback');

    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }

    this.wavesurfer = createWavesurfer({
      container: this.waveformContainer
    });

    this.record = this.wavesurfer.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        continuousWaveform: true,
        continuousWaveformDuration: 30
      })
    );

    this.record.on('record-end', (blob: Blob) => {
      this.recordingBlob = blob;
      this.hasRecording = true;
      this.createPlaybackWaveSurfer();
    });

    this.record.on('record-progress', (time: number) => {
      this.updateRecordingTime(time);
    });
  }

  private updateRecordingTime(time: number): void {
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    this.recordingTime = [
      minutes < 10 ? '0' + minutes : minutes,
      seconds < 10 ? '0' + seconds : seconds
    ].join(':');
  }

  private createPlaybackWaveSurfer(): void {
    setTimeout(() => {
      this.playbackContainer = this.root.shadowRoot.querySelector('#playback');
      if (!this.playbackContainer) {
        return;
      }

      if (this.playbackWavesurfer) {
        this.playbackWavesurfer.destroy();
      }

      const recordedUrl = URL.createObjectURL(this.recordingBlob);
      this.playbackWavesurfer = createWavesurfer({
        container: this.playbackContainer,
        url: recordedUrl
      });

      this.playbackWavesurfer.on('play', () => {
        this.isPlaying = true;
      });

      this.playbackWavesurfer.on('pause', () => {
        this.isPlaying = false;
      });

      this.playbackWavesurfer.on('finish', () => {
        this.isPlaying = false;
      });
    }, 0);
  }

  private async startRecording(): Promise<void> {
    try {
      await this.record.startRecording();
      this.isRecording = true;
      this.recordingTime = '00:00';
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  private stopRecording(): void {
    if (this.record && this.isRecording) {
      this.record.stopRecording();
      this.isRecording = false;
      this.isPaused = false;
    }
  }

  private pauseRecording(): void {
    if (this.record && this.isRecording) {
      this.record.pauseRecording();
      this.isPaused = true;
    }
  }

  private resumeRecording(): void {
    if (this.record && this.isPaused) {
      this.record.resumeRecording();
      this.isPaused = false;
    }
  }

  private playRecording(): void {
    if (!this.playbackWavesurfer) {
      this.createPlaybackWaveSurfer();
      setTimeout(() => this.playbackWavesurfer?.play(), 100);
    } else {
      this.playbackWavesurfer.play();
    }
  }

  private pausePlayback(): void {
    if (this.playbackWavesurfer) {
      this.playbackWavesurfer.pause();
    }
  }

  private submitAudio(): void {
    if (this.recordingBlob) {
      this.audioSubmit.emit({
        audioBlob: this.recordingBlob
      });
    }
  }

  private resetRecording(): void {
    this.hasRecording = false;
    this.isRecording = false;
    this.isPaused = false;
    this.isPlaying = false;
    this.recordingBlob = null;
    this.recordingTime = '00:00';
    if (this.playbackWavesurfer) {
      this.playbackWavesurfer.destroy();
      this.playbackWavesurfer = null;
    }
    this.initializeWaveSurfer();
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class="audio-upload">
          <div class="section">
            <label>Recording</label>
            <div class="recording-time">{this.recordingTime}</div>
            <div id="waveform" class="waveform-container"></div>
            <div class="recording-controls">
              <button
                onClick={() => this.startRecording()}
                disabled={this.isRecording || this.hasRecording}
              >
                Start Recording
              </button>
              <button
                onClick={() => this.pauseRecording()}
                disabled={!this.isRecording || this.isPaused}
              >
                Pause
              </button>
              <button
                onClick={() => this.resumeRecording()}
                disabled={!this.isPaused}
              >
                Resume
              </button>
              <button
                onClick={() => this.stopRecording()}
                disabled={!this.isRecording}
              >
                Stop
              </button>
            </div>
          </div>

          <div class="section">
            <label>Playback</label>
            <div id="playback" class="waveform-container"></div>
            <div class="playback-controls">
              <button
                onClick={() => this.playRecording()}
                disabled={this.isPlaying}
              >
                Play Recording
              </button>
              <button
                onClick={() => this.pausePlayback()}
                disabled={!this.isPlaying}
              >
                Pause Recording
              </button>
              <button onClick={() => this.resetRecording()} disabled={false}>
                Record Again
              </button>
            </div>
          </div>

          <div class="section">
            <label>Submit</label>
            <div class="submit-section">
              <button
                onClick={() => this.submitAudio()}
                disabled={!this.hasRecording}
              >
                Submit Audio
              </button>
            </div>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
