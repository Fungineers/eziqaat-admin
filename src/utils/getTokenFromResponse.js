/**
 *
 * @param {import("axios").AxiosResponse} res
 */
export default function getTokenFromResponse(res) {
  try {
    const authorization = res.headers.getAuthorization();
    const [, token] = authorization.split(" ");
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
}
