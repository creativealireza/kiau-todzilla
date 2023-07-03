export const getUserName = (data) => {
    return data?.slice(data.lastIndexOf("/") + 1);
  }