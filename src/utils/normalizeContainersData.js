const normalizeContainersData = (containerList, avgFormat) => {
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
    data: Object.values(ticks),
    lines,
  };
};

export default normalizeContainersData;
