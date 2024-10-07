//@ts-expect-error
import fitratLogo from "/fitrat.png";

export const SignupConfirm = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={fitratLogo} className="App-logo" alt="FitRat logo" />
        <h1>Thank you for registering your account</h1>
        <p className="App-subtitle">You can now login inside the app</p>
      </header>
    </div>
  );
};
