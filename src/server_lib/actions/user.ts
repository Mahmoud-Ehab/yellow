import path from "path";
import fs from "fs";
import { user } from "../statefiles/user"
import { ActionReturn } from "../types"

export const getInfo = (): ActionReturn => {
  return { res: user.get(0) };
};

export const setInfo = (username: string, ipaddr: string): ActionReturn => {
  try {
    user.update(0, () => ({ username, ipaddr }));
    return { res: true };
  } catch (err) {
    console.error(err);
    return { err, res: false };
  }
};

export const setImage = (imgUri: string): ActionReturn => {
  try {
    fs.writeFileSync(
      path.join(process.cwd(), "/resources/usrimg.jpg"),
      Buffer.from(imgUri.split(",")[1], "base64"),
    );
    return { res: true };
  } catch (err) {
    console.error(err);
    return { res: false, err: "something went wrong!" };
  }
};
