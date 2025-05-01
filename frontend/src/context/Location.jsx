import { useEffect } from "react";

export default function LocationTracker() {
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));

                    if (latitude >= 43 && latitude <= 49 && longitude >= 20 && longitude <= 30) {
                        localStorage.setItem("preferredLanguage", "Romanian");
                    } else {
                        localStorage.setItem("preferredLanguage", "English");
                    }
                },
                (error) => {
                    console.error("Could not get location", error);
                }
            );
        }
    }, []);

    return null;
}
