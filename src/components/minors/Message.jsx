const Message = ({ msg, bgColor }) => {
    let styles = {
        padding: "0.5rem",
        paddingTop: "1.5rem",
        marginBottom: "1rem",
        borderRadius: "1rem",
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: bgColor,
    };

    return (
        <div style={styles}>
            <p>{msg}</p>
        </div>
    );
};

export default Message;
