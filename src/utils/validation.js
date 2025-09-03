export function isValidEmail(name) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!pattern.test(name)) {
                return ['Please enter a valid email address']
        }
        return []
}

export function isValidPassword(password) {
        const errors = [];

        if (password.length < 8) {
                errors.push("Password must be at least 8 characters long.");
        }

        if (!/[A-Z]/.test(password)) {
                errors.push("Password must contain at least one uppercase letter.");
        }

        if (!/[a-z]/.test(password)) {
                errors.push("Password must contain at least one lowercase letter.");
        }

        if (!/[0-9]/.test(password)) {
                errors.push("Password must contain at least one number.");
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                errors.push("Password must contain at least one special character.");
        }

        return errors
}

export function isValidName(name) {
        const errors = [];

        const trimmed = name.trim();

        if (trimmed.length === 0) {
                errors.push("Name cannot be empty.");
        }

        if (trimmed.length > 0 && trimmed.length < 3) {
                errors.push("Name must be at least 3 characters long.");
        }

        if (!/^[A-Za-z\s'-]+$/.test(trimmed)) {
                errors.push("Name can't contain numbers or special characters");
        }

        return errors;
}


