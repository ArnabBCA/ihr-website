import * as WorldMapAggregatedAlarmsDataModel from '../WorldMapAggregatedAlarmsDataModel'


const ALARMS = [
    {
        asn_name: 'SOTCOM-AS JSC Telephone Company "Sotcom"',
        asn: '34467',
        country_iso_code2: 'RU',
        hegemony_alarm_counts: [1],
        hegemony_alarm_timebins: ['2023-08-10T00:00:00Z'],
        hegemony_alarm_severities: ['high'],
        network_delay_alarm_counts: [1],
        network_delay_alarm_timebins: ['2023-08-10T00:15:00Z'],
        network_delay_alarm_severities: ['high'],
        moas_alarm_counts: [1],
        moas_alarm_timebins: ['2023-08-10T11:15:00Z'],
        moas_alarm_severities: ['high'],
        submoas_alarm_counts: [],
        submoas_alarm_timebins: [],
        submoas_alarm_severities: [],
        defcon_alarm_counts: [],
        defcon_alarm_timebins: [],
        defcon_alarm_severities: [],
        edges_alarm_counts: [],
        edges_alarm_timebins: [],
        edges_alarm_severities: [],
        ping_slash24_alarm_counts: [],
        ping_slash24_alarm_timebins: [],
        ping_slash24_alarm_severities: [],
        bgp_alarm_counts: [],
        bgp_alarm_timebins: [],
        bgp_alarm_severities: [],
        ucsd_nt_alarm_counts: [],
        ucsd_nt_alarm_timebins: [],
        ucsd_nt_alarm_severities: [],
        country_iso_code3: 'RUS',
        country_name: 'Russia'
    },
    {
        asn_name: 'CONNETRO-AS CONNET - RO SRL',
        asn: '34469',
        country_iso_code2: 'RO',
        hegemony_alarm_counts: [1],
        hegemony_alarm_timebins: ['2023-08-10T00:00:00Z'],
        hegemony_alarm_severities: ['high'],
        network_delay_alarm_counts: [],
        network_delay_alarm_timebins: [],
        network_delay_alarm_severities: [],
        moas_alarm_counts: [],
        moas_alarm_timebins: [],
        moas_alarm_severities: [],
        submoas_alarm_counts: [],
        submoas_alarm_timebins: [],
        submoas_alarm_severities: [],
        defcon_alarm_counts: [],
        defcon_alarm_timebins: [],
        defcon_alarm_severities: [],
        edges_alarm_counts: [],
        edges_alarm_timebins: [],
        edges_alarm_severities: [],
        ping_slash24_alarm_counts: [],
        ping_slash24_alarm_timebins: [],
        ping_slash24_alarm_severities: [],
        bgp_alarm_counts: [],
        bgp_alarm_timebins: [],
        bgp_alarm_severities: [],
        ucsd_nt_alarm_counts: [],
        ucsd_nt_alarm_timebins: [],
        ucsd_nt_alarm_severities: [],
        country_iso_code3: 'ROU',
        country_name: 'Romania'
    },
    {
        asn_name: 'YOUTUBE',
        asn: '36040',
        country_iso_code2: 'US',
        ping_slash24_alarm_counts: [],
        ping_slash24_alarm_timebins: [],
        ping_slash24_alarm_severities: [],
        bgp_alarm_counts: [1],
        bgp_alarm_timebins: ['2023-08-10T00:00:00Z'],
        bgp_alarm_severities: ['high'],
        ucsd_nt_alarm_counts: [],
        ucsd_nt_alarm_timebins: [],
        ucsd_nt_alarm_severities: [],
        hegemony_alarm_counts: [],
        network_delay_alarm_counts: [],
        moas_alarm_counts: [],
        submoas_alarm_counts: [],
        defcon_alarm_counts: [],
        edges_alarm_counts: [],
        hegemony_alarm_timebins: [],
        network_delay_alarm_timebins: [],
        moas_alarm_timebins: [],
        submoas_alarm_timebins: [],
        defcon_alarm_timebins: [],
        edges_alarm_timebins: [],
        hegemony_alarm_severities: [],
        network_delay_alarm_severities: [],
        moas_alarm_severities: [],
        submoas_alarm_severities: [],
        defcon_alarm_severities: [],
        edges_alarm_severities: [],
        country_iso_code3: 'USA',
        country_name: 'United States'
    }
]
describe('etlWorldMapAggregatedAlarmsDataModel', () => {

    it('should correctly ETL WorldMapAggregatedAlarmsDataModel when all data sources selected', () => {
        const alarmCountsSelected = ["hegemony_alarm_counts", "network_delay_alarm_counts", "moas_alarm_counts",
            "submoas_alarm_counts", "defcon_alarm_counts", "edges_alarm_counts",
            "bgp_alarm_counts", "ucsd_nt_alarm_counts", "ping_slash24_alarm_counts"]

        const result = WorldMapAggregatedAlarmsDataModel.etl(ALARMS, alarmCountsSelected)

        const expectedResult = {
            customdata: [
                {
                    hegemony_alarm_counts: 1,
                    network_delay_alarm_counts: 1,
                    moas_alarm_counts: 1,
                    submoas_alarm_counts: 0,
                    defcon_alarm_counts: 0,
                    edges_alarm_counts: 0,
                    bgp_alarm_counts: 0,
                    ucsd_nt_alarm_counts: 0,
                    ping_slash24_alarm_counts: 0
                },
                {
                    hegemony_alarm_counts: 1,
                    network_delay_alarm_counts: 0,
                    moas_alarm_counts: 0,
                    submoas_alarm_counts: 0,
                    defcon_alarm_counts: 0,
                    edges_alarm_counts: 0,
                    bgp_alarm_counts: 0,
                    ucsd_nt_alarm_counts: 0,
                    ping_slash24_alarm_counts: 0
                },
                {
                    hegemony_alarm_counts: 0,
                    network_delay_alarm_counts: 0,
                    moas_alarm_counts: 0,
                    submoas_alarm_counts: 0,
                    defcon_alarm_counts: 0,
                    edges_alarm_counts: 0,
                    bgp_alarm_counts: 1,
                    ucsd_nt_alarm_counts: 0,
                    ping_slash24_alarm_counts: 0
                }
            ],
            locations: ['RUS', 'ROU', 'USA'],
            z: [3, 1, 1],
            text: ['Russia', 'Romania', 'United States'],
            hovertemplate: '<b>%{text}</b><br>Total Alarm Counts: %{z}<br>Hegemony Alarm Counts: %{customdata.hegemony_alarm_counts}<br>Network Delay Alarm Counts: %{customdata.network_delay_alarm_counts}<br>Moas Alarm Counts: %{customdata.moas_alarm_counts}<br>Submoas Alarm Counts: %{customdata.submoas_alarm_counts}<br>Defcon Alarm Counts: %{customdata.defcon_alarm_counts}<br>Edges Alarm Counts: %{customdata.edges_alarm_counts}<br>Bgp Alarm Counts: %{customdata.bgp_alarm_counts}<br>Ucsd Nt Alarm Counts: %{customdata.ucsd_nt_alarm_counts}<br>Ping Slash24 Alarm Counts: %{customdata.ping_slash24_alarm_counts}<br>'
        }
        expect(result).toEqual(expectedResult)
    });

    it('should correctly ETL WorldMapAggregatedAlarmsDataModel with specific alarm counts selected', () => {
        const alarmCountsSelected = ["moas_alarm_counts", "bgp_alarm_counts"];

        const result = WorldMapAggregatedAlarmsDataModel.etl(ALARMS, alarmCountsSelected);

        const expectedResult = {
            customdata: [
                { moas_alarm_counts: 1, bgp_alarm_counts: 0 },
                { moas_alarm_counts: 0, bgp_alarm_counts: 0 },
                { moas_alarm_counts: 0, bgp_alarm_counts: 1 }
            ],
            locations: ['RUS', 'ROU', 'USA'],
            z: [1, 0, 1],
            text: ['Russia', 'Romania', 'United States'],
            hovertemplate: '<b>%{text}</b><br>Total Alarm Counts: %{z}<br>Moas Alarm Counts: %{customdata.moas_alarm_counts}<br>Bgp Alarm Counts: %{customdata.bgp_alarm_counts}<br>'
        }

        expect(result).toEqual(expectedResult);
    });

    it('should correctly handle aggregating alarm data for specified metrics and countries even if they not exist in the data', () => {
        const alarms = [
            {
                asn_name: 'SOTCOM-AS JSC Telephone Company "Sotcom"',
                asn: '34467',
                country_iso_code2: 'RU',
                moas_alarm_counts: [1],
                moas_alarm_timebins: ['2023-08-10T11:15:00Z'],
                moas_alarm_severities: ['high'],
                submoas_alarm_counts: [],
                submoas_alarm_timebins: [],
                submoas_alarm_severities: [],
                defcon_alarm_counts: [],
                defcon_alarm_timebins: [],
                defcon_alarm_severities: [],
                edges_alarm_counts: [],
                edges_alarm_timebins: [],
                edges_alarm_severities: [],
                ping_slash24_alarm_counts: [],
                ping_slash24_alarm_timebins: [],
                ping_slash24_alarm_severities: [],
                bgp_alarm_counts: [],
                bgp_alarm_timebins: [],
                bgp_alarm_severities: [],
                ucsd_nt_alarm_counts: [],
                ucsd_nt_alarm_timebins: [],
                ucsd_nt_alarm_severities: [],
                country_iso_code3: 'RUS',
                country_name: 'Russia'
            },
            {
                asn_name: 'YOUTUBE',
                asn: '36040',
                country_iso_code2: 'US',
                ping_slash24_alarm_counts: [],
                ping_slash24_alarm_timebins: [],
                ping_slash24_alarm_severities: [],
                bgp_alarm_counts: [1],
                bgp_alarm_timebins: ['2023-08-10T00:00:00Z'],
                bgp_alarm_severities: ['high'],
                ucsd_nt_alarm_counts: [],
                ucsd_nt_alarm_timebins: [],
                ucsd_nt_alarm_severities: [],
                moas_alarm_counts: [],
                submoas_alarm_counts: [],
                defcon_alarm_counts: [],
                edges_alarm_counts: [],
                moas_alarm_timebins: [],
                submoas_alarm_timebins: [],
                defcon_alarm_timebins: [],
                edges_alarm_timebins: [],
                moas_alarm_severities: [],
                submoas_alarm_severities: [],
                defcon_alarm_severities: [],
                edges_alarm_severities: [],
                country_iso_code3: 'USA',
                country_name: 'United States'
            }
        ]
        const alarmCountsSelected = ["hegemony_alarm_counts", "network_delay_alarm_counts"]
        const result = WorldMapAggregatedAlarmsDataModel.etl(alarms, alarmCountsSelected)
        expect(result).toEqual({})
    });

    it('should handle empty input alarms array', () => {
        const alarms = [];
        const alarmCountsSelected = ["hegemony_alarm_counts", "network_delay_alarm_counts"];
        const result = WorldMapAggregatedAlarmsDataModel.etl(alarms, alarmCountsSelected);
        expect(result).toEqual({});
    });

    it('should handle empty alarmCountsSelected but non-empty alarms', () => {
        const alarmCountsSelected = [];
        const result = WorldMapAggregatedAlarmsDataModel.etl(ALARMS, alarmCountsSelected);
        expect(result).toEqual({});
    });

    it('should handle alarmCountsSelected that doesnt exist in the alarms data', () => {
        const alarmCountsSelected = ['fake_alarm_counts_selected'];
        const result = WorldMapAggregatedAlarmsDataModel.etl(ALARMS, alarmCountsSelected);
        expect(result).toEqual({});
    });
})
