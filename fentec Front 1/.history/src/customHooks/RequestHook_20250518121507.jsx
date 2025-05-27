import { useContext, useEffect, useState } from "react";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";


const useRequest = (
    transections,setTransections,setNotifications,notifications) => {
    const Aborter = new AbortController();
    const {getToken} = useContext(authContext) ;
    const {setLoading,setError} = useContext(uiContext);

    const applyErrors = (error) => {
        setError(error)
        setTimeout(() => {
            setError('')
        }, 1000);
    }
    // function to remove deleted notification
    const deleteNotifications = (id) => {
        setNotifications(
            notifications.filter( notif => notif.id !== id)
        )
    }
    // function to read all notifications 
    const readNotifications = () => {
        setNotifications(
            notifications.map((notif) => {
                notif.viewed = true
                return notif
            }))
    }
    const processResponseData = (data) => {
        if (data?.name === 'transections'){
            // setTransections(data?.data)
            if (data?.data?.previous){ // is refetch call
                setTransections((prev) =>({
                    ...data?.data,
                    results: [...prev.results, ...data?.data?.results], // append new results
                }))
            }else{ its a new call

            }
        }
        if (data?.name === 'notifications'){
            setNotifications(data.data)
        }
        if (data?.name === 'notif_read'){
            readNotifications()
        }
        if (data?.name === 'notif_delete'){
            deleteNotifications(data.id)
        }
        if (data?.name === 'notif_delete_all'){
            setNotifications([]);
        }
    }
    const sendRequest = async (url,method,formdata="") => {
        setLoading(true);
        let token = await getToken()
        if (!token) {
            return setError('Try again later')
        }
        let options = {
            signal : Aborter.signal ,
            method:method,
            headers : {
                "Content-Type":"application/json",
                Authorization : `Bearer ${token}`
            }}
        if (method !== "GET"){
            options.body = JSON.stringify(formdata)
         }
        setTimeout(() => {
            fetch(`${config.BASE_URL}${url}`,options
        ).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (!data.error){
                    // grab response here 
                    processResponseData(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setLoading(false);
            }).catch((err) => {
                 //    show error here 
                setLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    return ({sendRequest});
}
 
export default useRequest;