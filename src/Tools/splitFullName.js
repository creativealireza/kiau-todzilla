import { capitalFirstLetter } from "./capitalFirstLetter";

export const splitFullName = (str) => {
    const fullname = str.split(" ")

    let firstName;
    let lastName

    if (!Boolean(fullname.length % 2) && fullname.length === 4) {
        firstName = capitalFirstLetter(fullname[0]).concat(" ", capitalFirstLetter(fullname[1]));
        lastName = capitalFirstLetter(fullname[2]).concat(" ", capitalFirstLetter(fullname[3]));
    } else if (!Boolean(fullname.length % 2)) {
        firstName = capitalFirstLetter(fullname[0]);
        lastName = capitalFirstLetter(fullname[1]);
    } else {
        firstName = capitalFirstLetter(fullname[0]).concat(" ", capitalFirstLetter(fullname[1]));
        lastName = capitalFirstLetter(fullname[2]);
    }


    return {
        firstName,
        lastName,
        fullName: [firstName, lastName].join(" ")
    }
}