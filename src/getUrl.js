let URL = import.meta.env.VITE_MODE==="developement"?import.meta.env.VITE_LOCAL_URL:import.meta.env.VITE_LIVE_URL

export default URL