export const handleGoogleOneTapOrButton = (clientId, callback) => {
  window.google.accounts.id.initialize({
    client_id: clientId,
    callback,
  });

  // To render a button
  window.google.accounts.id.renderButton(
    document.getElementById("google-signin-button"),
    {
      theme: "outline",
      size: "large",
    }
  );

  // Optionally enable the One Tap prompt
  window.google.accounts.id.prompt();
};
