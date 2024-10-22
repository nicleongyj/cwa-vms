export const fetchUser = async (userId: string) => {
    console.log("UUID received: ", userId);
    if (userId === "some-uuid-1") {
        return { name: "Yong Jing" };
    }
    return { name: "Zeyu" };
};

export const fetchAllUsers = async () => {
    return [{ name: "Yong Jing" }, { name: "Zeyu" }];
};
