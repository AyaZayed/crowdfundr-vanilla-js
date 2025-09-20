import { getMinPledgeAmount } from "./constants";

export function isNotEmpty(value, fieldName) {
        const errors = [];
        if (!value) {
                errors.push(`${fieldName} is required`);
        }
        return errors
}

export function isValidEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email) return ['Email is required']
        if (!pattern.test(email)) {
                return ['Please enter a valid email address']
        }
        return []
}

export function isValidPassword(password) {
        const errors = [];

        if (password.length < 8) {
                errors.push("Password must be at least 8 characters long");
        }

        if (!/[A-Z]/.test(password)) {
                errors.push("Password must contain at least one uppercase letter");
        }

        if (!/[a-z]/.test(password)) {
                errors.push("Password must contain at least one lowercase letter");
        }

        if (!/[0-9]/.test(password)) {
                errors.push("Password must contain at least one number");
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                errors.push("Password must contain at least one special character");
        }

        return errors.join(", ");
}

export function isValidMatchPass(password, matchPassword) {
        const errors = [];

        if (password !== matchPassword) {
                errors.push("Passwords do not match");
        }

        return errors
}

export function isValidName(name) {
        const errors = [];

        const trimmed = name.trim();

        if (trimmed.length === 0) {
                errors.push("Name can't be empty");
        }

        if (trimmed.length > 0 && trimmed.length < 3) {
                errors.push("Name must be at least 3 characters long");
        }

        if (!/^[A-Za-z\s'-]+$/.test(trimmed)) {
                errors.push("Name can't contain numbers or special characters");
        }

        return errors.join(", ");
}

export function validateCampaignTitle(title) {
        const errors = [];

        const trimmed = title.trim();

        if (trimmed.length === 0) {
                errors.push("Title can't be empty ");
        }

        if (trimmed.length > 0 && trimmed.length < 3) {
                errors.push("Title must be at least 3 characters long ");
        }

        return errors;
}

export function validateCampaignDescription(description) {
        const errors = [];

        const trimmed = description.trim();

        if (trimmed.length === 0) {
                errors.push("Description can't be empty ");
        }

        if (trimmed.length > 0 && trimmed.length < 10) {
                errors.push("Description must be at least 10 characters long ");
        }

        return errors;
}

export function validateCampaignGoal(goal) {
        const errors = [];

        if (goal <= 0) {
                errors.push("This must be greater than 0");
        }

        return errors;
}

export function validateCampaignDeadline(deadline) {
        const errors = [];

        if (!deadline) {
                errors.push("Deadline is required ");
        }

        if (new Date(deadline) < new Date()) {
                errors.push("Date must be in the future ");
        }

        return errors;
}

export function validateCampaignImage(image, isFile = true) {
        const errors = [];

        if (!image) {
                errors.push("Image is required ");
        }

        if (image && isFile && image.type !== 'image/jpeg' && image.type !== 'image/png' && image.type !== 'image/jpg' && image.type !== 'image/webp' && image.type !== 'image/svg' && image.type !== 'image/avif') {
                errors.push("Image must be a JPEG, PNG, JPG, WEBP, or SVG file ");
        }

        return errors;
}

export function validateSelect(option) {
        const errors = [];

        if (option === "" || option === null || option === "all") {
                errors.push("Please select an option ");
        }

        return errors;
}

export async function validatePledgeAmount(amount) {
        const errors = [];
        const pattern = /^[0-9]+$/
        const minAmount = await getMinPledgeAmount();

        if (!pattern.test(amount)) {
                errors.push("Amount must contain only digits ");
        }

        if (amount < minAmount) {
                errors.push("Amount must be greater than or equal to " + minAmount);
        }
        return errors;

}

export function validatePledgeExpiry(expiry) {
        const errors = [];
        const cleaned = expiry.replace(/\D/g, "");

        if (cleaned.length !== 4) {
                errors.push("Expiry date must be 4 digits (MMYY)");
                return errors;
        }

        const month = parseInt(cleaned.substring(0, 2), 10);
        const year = parseInt("20" + cleaned.substring(2), 10);

        if (month < 1 || month > 12) {
                errors.push("Month must be between 01 and 12");
        }

        const now = new Date();
        const expDate = new Date(year, month - 1, 1);
        expDate.setMonth(expDate.getMonth() + 1);

        if (expDate <= now) {
                errors.push("Card has expired");
        }

        return errors;
}


export function validatePledgeCVV(cvv) {
        const errors = [];
        const pattern = /^[0-9]{3}$/

        if (cvv.length !== 3) {
                errors.push("CVV must be 3 digits ");
        }

        if (!pattern.test(cvv)) {
                errors.push("CVV must contain only digits ");
        }

        return errors;
}

export function validatePledgeCard(card) {
        const errors = [];
        const cleaned = card.replace(/\D/g, "");

        if (cleaned.length !== 16) {
                errors.push("Card number must be 16 digits");
        }

        return errors;
}