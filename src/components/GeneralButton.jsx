export default function GeneralButton({buttonName, callback, ...props}) {
    return (
        <button onClick={callback}>
            {buttonName}
        </button>
    );
}