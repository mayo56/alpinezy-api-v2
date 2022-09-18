/**
 * Type user
 * @alpha
 */
export type User = {
    username: string; user_id: string; user_code: string;
    system: boolean;
    avatar_url: string; avatar_id: string;
    banner_url: string; banner_id: string;
    flags_list: Array<Flags> | Array<string>;
};

/**
 * Type des drapeaux (badges) de profile utilisateur
 * @alpha
 */
export type Flags = {
    flag_id: string; flag_name: string;
    svg_path: Array<string>; svg_fill: Array<string>;
};

/**
 * Type des posts
 * @alpha
 */
export type Post = {
    post_author: User;
    post_name: string; post_content: string
    post_id: string; post_configuration: number;
    post_comments: Array<Comment>;
};

/**
 * Type des commentaires pour les posts
 * @alpha
 */
export type Comment = {
    comment_author: User;
    comment_id: string; comment_message: string;
};

/**
 * Type des messages
 * @alpha
 */
export type Message = {
    message_id: string;
    message_author: User;
    message_content: string;
    message_reply: {
        isReply: boolean;
        message_id: string | null;
        message_content: string | null;
        message_author: User | null;
    };
};

/**
 * Type pour les connexions (singin)
 */
export type SigninBody = {
    email: string; password: string;
};
export type Signin = {
    user_id:string;
    email: string; password: string;
    username: string; user_code: string;
}

/**
 * Type pour les inscription (signup)
 */
export type SignupBody = {
    username: string; user_code: string;
    email: string; password: string;
}