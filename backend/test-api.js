const testApi = async () => {
    try {
        console.log("--- 1. Testing POST /api/hero ---");
        const heroRes = await fetch("http://localhost:5000/api/hero", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                badge: "Software Solutions",
                titles: ["We Build Mobile That Matter", "We Build Website That Matter"],
                subtitle: "Testing subtitle",
                techStack: [{ name: "React", link: "#" }]
            })
        });
        const heroData = await heroRes.json();
        console.log("Response Status:", heroRes.status);
        console.log("Response Body:", heroData);

        console.log("\n--- 2. Testing GET /api/hero ---");
        const getHeroRes = await fetch("http://localhost:5000/api/hero");
        const getHeroData = await getHeroRes.json();
        console.log("Response Status:", getHeroRes.status);
        console.log("Response Body:", getHeroData);

        console.log("\n--- 3. Testing POST /api/orbit ---");
        const orbitRes = await fetch("http://localhost:5000/api/orbit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Figma",
                icon: "figma-icon.png",
                orbitLevel: 1
            })
        });
        const orbitData = await orbitRes.json();
        console.log("Response Status:", orbitRes.status);
        console.log("Response Body:", orbitData);

        console.log("\n--- 4. Testing GET /api/orbit ---");
        const getOrbitRes = await fetch("http://localhost:5000/api/orbit");
        const getOrbitData = await getOrbitRes.json();
        console.log("Response Status:", getOrbitRes.status);
        console.log("Response Body:", getOrbitData);

    } catch (error) {
        console.error("Test failed:", error);
    }
};

testApi();
