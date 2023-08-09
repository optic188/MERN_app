export const calculateAgeFromBirthdate = (birthdateISO: string):number => {
    const birthdate = new Date(birthdateISO);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000); // Assuming an average year length of 365 days

    return Math.floor(ageInYears);
}