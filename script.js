function calculateBooking() {
    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;
    let adults = parseInt(document.getElementById("adults").value) || 0;
    let children = parseInt(document.getElementById("children").value) || 0;

    // validation
    if (!checkin || !checkout) {
        alert("Please select check-in and check-out dates");
        return;
    }

    let date1 = new Date(checkin);
    let date2 = new Date(checkout);

    let timeDiff = date2 - date1;
    let days = timeDiff / (1000 * 60 * 60 * 24);

    if (days <= 0) {
        alert("Check-out must be after check-in");
        return;
    }

    // base price
    let pricePerDay = 300;
    let total = pricePerDay * days;

    // included: 2 adults + 2 children
    let extraAdults = Math.max(0, adults - 2);
    let extraChildren = Math.max(0, children - 2);

    let extraCost = (extraAdults * 20 + extraChildren * 10) * days;

    total += extraCost;

    // discount (spice 🔥)
    if (days >= 5) {
        total = total * 0.9; // 10% discount
    }

    alert(
        "Booking Summary:\n\n" +
        "Days: " + days + "\n" +
        "Adults: " + adults + "\n" +
        "Children: " + children + "\n\n" +
        "Total Price: $" + total.toFixed(2)
    );
}




function scrollToSection(id) {
    const target = document.getElementById(id);
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        let timeElapsed = currentTime - start;
        let run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
