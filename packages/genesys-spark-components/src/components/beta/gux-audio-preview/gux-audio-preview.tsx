import {
  Component,
  Element,
  h,
  Host,
  JSX,
  Prop,
  State,
  Watch
} from '@stencil/core';
import type WaveSurfer from 'wavesurfer.js';

import { trackComponent } from '@utils/tracking/usage';
import { createWavesurfer } from '@utils/audio/create-wavesurfer';

@Component({
  styleUrl: 'gux-audio-preview.scss',
  tag: 'gux-audio-preview-beta',
  shadow: true
})
export class GuxAudioPreview {
  private waveformElement: HTMLDivElement;
  private wavesurfer: WaveSurfer;

  @Element() root: HTMLElement;

  @Prop() url: string;

  @State() isPlaying: boolean = false;
  @State() currentTime: number = 0;
  @State() duration: number = 0;
  @State() volume: number = 1;
  @State() playbackRate: number = 1;
  @State() isMuted: boolean = false;
  @State() fileSize: string = 'Loading...';

  @Watch('url')
  handleurlChange(): void {
    this.wavesurfer.setOptions({ url: this.url });
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentDidLoad(): void {
    this.wavesurfer = createWavesurfer({
      container: this.waveformElement,
      url: this.url
    });

    this.wavesurfer.on('ready', () => {
      this.duration = this.wavesurfer.getDuration();
    });

    this.wavesurfer.on('timeupdate', currentTime => {
      this.currentTime = currentTime;
    });

    this.wavesurfer.on('play', () => {
      this.isPlaying = true;
    });

    this.wavesurfer.on('pause', () => {
      this.isPlaying = false;
    });

    this.fetchFileSize();
  }

  private play(): void {
    this.wavesurfer.play();
  }

  private pause(): void {
    this.wavesurfer.pause();
  }

  private setVolume(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.volume = parseFloat(target.value);
    this.wavesurfer.setVolume(this.volume);
  }

  private setPlaybackRate(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.playbackRate = parseFloat(target.value);
    this.wavesurfer.setPlaybackRate(this.playbackRate);
  }

  private seek(event: Event): void {
    const target = event.target as HTMLInputElement;
    const progress = parseFloat(target.value) / 100;
    this.wavesurfer.seekTo(progress);
  }

  private formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private downloadAudio(): void {
    if (this.url) {
      const a = document.createElement('a');
      a.href = this.url;
      a.target = '_blank';
      a.download = '';

      a.click();
    }
  }

  private mute(): void {
    this.isMuted = true;
    this.wavesurfer.setMuted(true);
  }

  private unmute(): void {
    this.isMuted = false;
    this.wavesurfer.setMuted(false);
  }

  private async fetchFileSize(): Promise<void> {
    if (this.url) {
      try {
        const response = await fetch(this.url, { method: 'HEAD' });
        const size = response.headers.get('content-length');
        if (size) {
          const sizeInMB = (parseInt(size) / (1024 * 1024)).toFixed(2);
          this.fileSize = `${sizeInMB} MB`;
        }
      } catch {
        this.fileSize = 'N/A';
      }
    }
  }

  render(): JSX.Element {
    const progress = this.duration
      ? (this.currentTime / this.duration) * 100
      : 0;

    return (
      <Host>
        <div class="controls">
          <div class="control-group">
            <label>Source</label>
            <div class="source">{this.url}</div>
            <div class="source">Size: {this.fileSize}</div>
          </div>

          <div class="control-group">
            <label>Playback</label>
            <div class="waveform" ref={el => (this.waveformElement = el)}></div>
            <div class="slider-row">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onInput={e => this.seek(e)}
              />
              <span class="slider-display">
                {this.formatTime(this.currentTime)} /{' '}
                {this.formatTime(this.duration)}
              </span>
            </div>
            <div class="button-row">
              <button onClick={() => this.play()} disabled={this.isPlaying}>
                Play
              </button>
              <button onClick={() => this.pause()} disabled={!this.isPlaying}>
                Pause
              </button>
            </div>
          </div>

          <div class="control-group">
            <label>Volume</label>
            <div class="slider-row">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={this.volume}
                onInput={e => this.setVolume(e)}
              />
              <span class="slider-display">
                {Math.round(this.volume * 100)}%
              </span>
            </div>
            <div class="button-row">
              <button onClick={() => this.mute()} disabled={this.isMuted}>
                Mute
              </button>
              <button onClick={() => this.unmute()} disabled={!this.isMuted}>
                Unmute
              </button>
            </div>
          </div>

          <div class="control-group">
            <label>Speed</label>
            <div class="slider-row">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.25"
                value={this.playbackRate}
                onInput={e => this.setPlaybackRate(e)}
              />
              <span class="slider-display">{this.playbackRate}x</span>
            </div>
          </div>

          <div class="control-group">
            <label>Actions</label>
            <div class="button-row">
              <button onClick={() => this.downloadAudio()}>Download</button>
            </div>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
