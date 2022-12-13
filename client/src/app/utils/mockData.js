import axios from "axios";
import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
// import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };

    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = professions.length + qualities.length + users.length;

    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await axios.put("https://fast-company-firebase-f70c1-default-rtdb.europe-west1.firebasedatabase.app/profession/" + prof._id + ".json", prof);
                incrementCount();
            }
            for (const user of users) {
                await axios.put("https://fast-company-firebase-f70c1-default-rtdb.europe-west1.firebasedatabase.app/user/" + user._id + ".json", user);
                incrementCount();
            }
            for (const qual of qualities) {
                await axios.put("https://fast-company-firebase-f70c1-default-rtdb.europe-west1.firebasedatabase.app/quality/" + qual._id + ".json", qual);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
