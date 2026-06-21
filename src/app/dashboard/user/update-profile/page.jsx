import UpdateProfileForm from "@/components/user/UpdateProfileForm";
import { getUserSession } from "@/lib/api/core/getUserSession";
import { getUserByEmail } from "@/lib/api/user/user";

const UserProfilePage = async () => {
    const sessionUser = await getUserSession();

    const email = sessionUser?.email;
    const user = await getUserByEmail(email);

    // console.log(user);

    return (
        <div>
            <UpdateProfileForm user={user}></UpdateProfileForm>
        </div>
    );
};

export default UserProfilePage;