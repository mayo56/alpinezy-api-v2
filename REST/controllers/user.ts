import express from "express";
import request from "../../Outils/pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Flags, Signin, SigninBody, User } from "../../Outils/types";

export const userController = {
    user: async (req: express.Request, res: express.Response) => {
        const uid = req.query.uid;
        //faut les query pour accédé à la requete
        if (!uid) return res.sendStatus(400);

        //requête à la db (utilisateur)
        const elements = "user_id, username, user_code, avatar_url, avatar_id, banner_url, banner_id, flags_list";
        const reqUser = (await request("select " + elements + " from users where \"user_id\"='" + uid + "'")).rows[0] as User;

        //Si l'utilisateur n'existe pas
        if (!reqUser) return res.sendStatus(404);

        //transformation des flags (tableau d'id) en tableau plus précis
        //Si aucun flags
        if (!reqUser.flags_list) return res.status(200).send(reqUser);
        //Si flags
        const reqFlags = (await request(`select * from flags where flag_id in ('${Array.from(reqUser.flags_list as string[]).join("','")}')`)).rows as Flags[];
        reqFlags.map(flag => {
            //On transforme les strings contenant des Array en type Array<string>
            flag.svg_fill = Array.from(flag.svg_fill);
            flag.svg_path = Array.from(flag.svg_path);
            return flag;
        });
        reqUser.flags_list = reqFlags; //Attribution des badges dans le json
        return res.status(200).send(reqUser);
    },
    signin: async (req: express.Request, res: express.Response) => {
        const body = req.body as SigninBody;
        //Si pas de body
        if (!body.email || !body.password) return res.sendStatus(400);

        //Vérification de l'adress e-mail
        //Requete à la db
        const reqEmailUser = (await request("select username, user_code, email, password from users where email='" + body.email + "'")).rows[0] as Signin;
        //Si pas l'utilisateur n'existe pas
        if (!reqEmailUser) return res.sendStatus(401);

        //Si l'utilisateur existe
        bcrypt.compare(body.password, reqEmailUser.password, async (err, result) => {
            if (err) return res.sendStatus(500);
            //resultat sur les mots de passe
            if (!result) return res.sendStatus(401);

            //Si le mdp est bon
            const token = jwt.sign({
                username: reqEmailUser.username,
                user_code: reqEmailUser.user_code,
            }, process.env.TOKEN_JWT as string);
            return res.send(201).send({ token });
        });
    }
};