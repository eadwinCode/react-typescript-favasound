import React from 'react';

export default function(InnerComponent:any) {
  class FetchOnScrollComponent extends React.Component<any> {
    constructor(props:IFetchOnScrollComponent) {
      super(props);
      this.onScroll = this.onScroll.bind(this);
    }

    public componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    public componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    public onScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
        this.props.scrollFunction();
      }
    }

    public render() {
      return <InnerComponent {...this.props} />;
    }
  }
  return FetchOnScrollComponent;
}

interface IFetchOnScrollComponent{
    scrollFunction:()=>void;
};