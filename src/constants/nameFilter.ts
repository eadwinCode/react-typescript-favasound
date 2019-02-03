export function getTracknameFilter(query:any) {
    return (activity:any) => {
      const title = activity.title.toLowerCase();
      return title.indexOf(query) !== -1;
    };
  }