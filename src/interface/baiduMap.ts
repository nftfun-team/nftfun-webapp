interface mapInter {
    address: string,
    // city: string,
    point: {
        lat: string
        lng: string
    },
    // province: string
}

interface mapData {
    type: string,
    data: mapInter
}

export { mapData, mapInter }