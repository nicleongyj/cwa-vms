export const fetchUser = async (userId: string) => {
    if (userId) {
        return { name: "Yong Jing" };
    }
};

export const fetchAllUsers = async () => {
    return [{ name: "Yong Jing" }, { name: "Zeyu" }];
};
