export const createClient = jest.fn().mockReturnValue({
  auth: {
    onAuthStateChange: jest.fn().mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    }),
  },
});
