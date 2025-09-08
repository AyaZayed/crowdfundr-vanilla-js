export default function EmptyCase(data, emptySection, infoSection) {
        if (data.length === 0) {
                emptySection.style.display = "flex";
                infoSection.style.display = "none";
        } else {
                emptySection.style.display = "none";
                infoSection.style.display = "flex";
        }
}