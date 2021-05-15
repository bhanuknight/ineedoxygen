import { Help } from '../models/requests.interface';

export const HelpData: Help[] = [
    {
        id: "1",
        title: "Need help",
        message: 'I need help',
        lastUpdated: "01/02/2021",
        created: "01/02/2021",
        location: {
            lat: 28.6920308,
            lon: 77.2381133
        },
        comments: []
    },
    {
        id: "2",
        title: "Need help",
        message: 'I need help',
        lastUpdated: "01/02/2021",
        created: "01/02/2021",
        location: {
            lat: 28.69444594163997,
            lon: 77.29309817393067
        },
        comments: [
            {
                user: '02',
                name: 'Bhanu',
                comment: 'I can help'
            }
        ]
    },
    {
        id: "3",
        title: "Need help",
        message: 'I need help',
        lastUpdated: "01/02/2021",
        created: "01/02/2021",
        location: {
            lat: 28.68864961816622,
            lon: 77.25770016712386
        },
        comments: []
    }
]