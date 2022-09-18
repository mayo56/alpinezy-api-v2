import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken"
import request from "../Outils/pg";
import { Flags, User } from "../Outils/types";


export const connectEvent = (socket:Socket, io:Server) => {

    const user = jwt.verify(socket.handshake.auth.token, process.env.TOKEN_JWT as string) as {username:string, user_code:string, user_id:string;}


    //Optenir les info utilisateur (.ME)
    socket.on("getInfoUserMe", async () => {
        const reqInfoUser = (await request(`select avatar_id, flags_list, system, user_code, username, user_id, friends_list, server_list from users where user_id='${user.user_id}'`)).rows[0] as User;
        const reqFlags = (await request(`select * from flags where flag_id in ('${Array.from(reqInfoUser.flags_list as string[]).join("','")}')`)).rows as Flags[];
        
        reqFlags.map(flag => {
            //On transforme les strings contenant des Array en type Array<string>
            flag.svg_fill = Array.from(flag.svg_fill);
            flag.svg_path = Array.from(flag.svg_path);
            return flag;
        });

        reqInfoUser.flags_list = reqFlags;

        io.to(socket.id).emit("resInfoUserMe", reqInfoUser)
    });

};