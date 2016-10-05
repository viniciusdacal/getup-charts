export const normalizeContainersData = (containerList, avgFormat) => {
  let lines = [];
  const ticks = containerList.reduce((acc, container) => {
    lines = [...lines, container.name];
    const formatted = container.data.reduce((accContainer, item) => {
      return {
        ...accContainer,
        [item.start]: {
          ...acc[item.start],
          ...accContainer[item.start],
          [container.name]: avgFormat(item.avg),
          start: item.start
        }
      };
    }, {});

    return {...acc, ...formatted};
  }, {});

  return {
    data: Object.keys(ticks).map(key => ticks[key]),
    lines,
  };
};

export const hexEncode = function(str){
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
};
