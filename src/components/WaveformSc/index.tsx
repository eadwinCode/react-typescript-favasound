import PropTypes from 'prop-types';
import React from 'react';
import * as Waveform from 'waveform.js';
import { normalizeSamples } from '../../services/track';

const WAVE_COLOR = '#61B25A';

class WaveformSc extends React.Component<IWaveformSc> {

  public componentDidMount() {
    const { activity, idx } = this.props;

    if (!activity) { return; }

    const { waveform_url, id } = activity;

    if (!waveform_url) { return; }

    const waveformUrlJson = waveform_url.replace('.png', '.json');

    const elementId = this.generateElementId(id, idx);

    this.fetchJsonWaveform(elementId, waveformUrlJson);
  }

  public fetchJsonWaveform(elementId:string, waveformUrl:string) {

    fetch(waveformUrl).then(response => response.json())
      .then((fetchedData) => {
        const options = 
        { 
          container: document.getElementById(elementId)!,
          data : normalizeSamples(fetchedData.samples),
          innerColor: WAVE_COLOR
        };
        const waveform = new Waveform(options as Waveform.Options);
        return waveform;
    });
  }

  public render() {
    const { activity, idx } = this.props;
    const { id } = activity;

    return <div className="track-waveform-json" id={"waveform-" + id + idx} />;
  }

  public fetchPngWaveform(elementId:string, activity:any) {
    const waveform = new Waveform({
      container: document.getElementById(elementId)!,
      innerColor: WAVE_COLOR
    } as Waveform.Options);
    waveform.dataFromSoundCloudTrack(activity);
  }

  public generateElementId(id:number, idx:number) {
    return `waveform-${id}${idx}`;
  }

}

interface IWaveformSc{
  activity: any;
  idx: number
};

export default WaveformSc;
