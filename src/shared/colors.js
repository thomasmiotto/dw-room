export const getWaitingRoomColor = (room) => {
    switch(room) {
        case 'A': return 'bg-secondary';
        case 'B': return 'bg-warning';
        case 'C': return 'bg-info';
        case 'D': return 'bg-success';
    }
}