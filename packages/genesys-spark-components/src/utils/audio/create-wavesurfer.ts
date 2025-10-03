import WaveSurfer from 'wavesurfer.js';

export interface GuxWaveSurferOptions {
  container: HTMLElement;
  url?: string;
}

export function createWavesurfer(opts: GuxWaveSurferOptions): WaveSurfer {
  const options = Object.assign(
    {},
    {
      container: '#waveform',
      waveColor: '#C1C6D4',
      progressColor: '#2143A2',
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 16,
      normalize: true,
      cursorColor: 'transparent',
      cursorWidth: 0,
      barHeight: 1,
      responsive: true
    },
    { ...opts }
  );

  return WaveSurfer.create(options);
}
