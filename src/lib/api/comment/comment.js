import { serverFetch, serverMutation } from "../core/server";

export const postComment = async (data) => {
    return await serverMutation('/user/comment', 'POST', data);
}
export const getUserComments = async (userEmail) => {
    const query = new URLSearchParams({ userEmail }).toString();
    return await serverFetch(`/user/comment?${query}`);
}
export const getLawyerComments = async (lawyerEmail) => {
    const query = new URLSearchParams({ lawyerEmail }).toString();
    return await serverFetch(`/lawyer/comment?${query}`);
}
export const editComment = async (commentId, data) => {
    return await serverMutation(`/user/comment/${commentId}`, 'PATCH', data);
}
export const deleteComment = async (commentId) => {
    return await serverMutation(`/user/comment/${commentId}`, 'DELETE');
}