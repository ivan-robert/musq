export const getErrorCode = (error: unknown): string | null => {
  if (error === null) {
    return null;
  }
  if (typeof error !== "object") {
    return null;
  }

  if ("code" in error) {
    return JSON.stringify(error["code"]);
  }
  return null;
};
