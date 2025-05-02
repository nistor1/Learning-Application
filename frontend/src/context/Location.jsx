/* import { useEffect } from "react";

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
*/
import { useEffect } from "react";

export default function LocationTracker() {
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };

                    const preferredLanguage = navigator.language || navigator.userLanguage || "en";

                    console.log("Saved location: " + location);
                    console.log("Saved language: " + preferredLanguage);

                    // Save to localStorage
                    localStorage.setItem("userLocation", JSON.stringify(location));
                    localStorage.setItem("userLanguage", preferredLanguage);

                    // Save to cookies (1 day expiration)
                    document.cookie = `userLocation=${encodeURIComponent(JSON.stringify(location))}; path=/; max-age=86400`;
                    document.cookie = `userLanguage=${preferredLanguage}; path=/; max-age=86400`;
                },
                (error) => {
                    console.error("Failed to get user location:", error.message);
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
        }
    }, []);

    return null;
}
