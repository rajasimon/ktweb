const CLIENT_ID = "jiKgtLy4"; // INSERT YOUR ID HERE!!!!
const CLIENT_SECRET = "PBXHcvoRbpxz3h2"; // INSERT YOUR SECRET HERE!!!!    
const getTestAttemptId = () => Math.random().toString(36).slice(2, 7);

function getHashTestAttemptId(testAttemptId) {
    if (CLIENT_SECRET === null) {
        return null;
    } else {
        const secretWordArray = CryptoJS.enc.Utf8.parse(CLIENT_SECRET);
        const messageWordArray = CryptoJS.enc.Utf8.parse(testAttemptId);
        const hash = CryptoJS.HmacSHA256(messageWordArray, secretWordArray);
        const base64HashedString = CryptoJS.enc.Base64.stringify(hash);
        return base64HashedString;
    }
}    

export function getCredentials(testAttemptId) {
    const hashedTestAttemptId = getHashTestAttemptId(testAttemptId, CLIENT_SECRET);
    const creds = {
        clientId: CLIENT_ID,
        testAttemptId: testAttemptId,
        hashedTestAttemptId: hashedTestAttemptId
    };
    return creds;
}    

const getReportOptions = () => {
    return {
        groupReportsIntoTabs: true,
        userDetails: {
            name: "First Last",
            email: "user@gmail.com"
        }
    };
};