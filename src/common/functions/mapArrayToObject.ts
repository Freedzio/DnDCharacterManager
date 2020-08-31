export default function mapArrayToObject(arr: Array<any>) {
    return Array.from(arr).reduce((obj, item) => {
        obj = {
            ...obj,
            [item.index as string]: item
        }
    }, {})
}