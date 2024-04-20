// dateUtils.js

export function calculateDaysRemaining(startDate, expire) {
    if (startDate === null) {
        return expire;
    }
    const today = new Date();
    const startDateObj = new Date(startDate);
    const daysRemaining = Math.max(0, expire - Math.ceil((today.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24)));
    return daysRemaining;
}
