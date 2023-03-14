import { ref, watch } from "vue"
import axios from "axios"

function useFetch(url, options = {onError: null}) {
    const data = ref(null)
    const error = ref(null)
    const isLoading = ref(true)

    let removeWatch = null
    if(options.onError){
        removeWatch = watch(error, (e) => options.onError(e))
    }

    axios
        .get(url)
        .then(res => data.value = res.data)
        .catch(e => error.value = e)
        .finally(() => {
            isLoading.value = false
            if(removeWatch) removeWatch()
        })

    return {data, error, isLoading}
}

export { useFetch }