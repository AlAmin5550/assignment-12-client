

const Profile = ({ user , loading}) => {
    if(loading){
        return <span className="loading loading-dots loading-lg"></span>;
    }
    return (
        <div>
            <img src={user.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
            <h1 className="text-3xl font-medium">Name:{user.displayName}</h1>
            <h1 className="text-3xl font-medium">email:{user.email}</h1>
        </div>
    );
};

export default Profile;