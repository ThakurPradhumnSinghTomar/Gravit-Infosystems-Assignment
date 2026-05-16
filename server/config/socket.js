let io;
export const initSocket = (server) => {
  io = server;
  return io;
};
export const getIO = () => io;
