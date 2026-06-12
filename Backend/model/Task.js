

export const createTaskModel = (data) => {
  return {
    topic: data.topic,
    description: data.description,
    createdAt: new Date(),
  };
};