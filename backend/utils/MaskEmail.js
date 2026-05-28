function MaskEmail(mail){
    const [username,domain]=mail.split('@');
    const maskedUsername=username.charAt(0)+'*'.repeat(username.length-2)+username.charAt(username.length-1);
    return maskedUsername+'@'+domain;
}

export default MaskEmail;