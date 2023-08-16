import * as TimeSeriesAggregatedAlarmsDataModel from '../TimeSeriesAggregatedAlarmsDataModel'

const ALARMS =
    [
        {
            asn_name: 'SOTCOM-AS JSC Telephone Company "Sotcom"',
            asn: '34467',
            country_iso_code2: 'RU',
            country_iso_code3: 'RUS',
            country_name: 'Russia',
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
        },
        {
            asn_name: 'CONNETRO-AS CONNET - RO SRL',
            asn: '34469',
            country_iso_code2: 'RO',
            country_iso_code3: 'ROU',
            country_name: 'Romania',
            hegemony_alarm_counts: [1, 1, 1],
            hegemony_alarm_timebins: ['2023-08-10T00:00:00Z', '2023-08-10T00:00:00Z', '2023-08-10T00:15:00Z'],
            hegemony_alarm_severities: ['high', 'high', 'high'],
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
            ucsd_nt_alarm_severities: []
        },
        {
            asn_name: 'YOUTUBE',
            asn: '36040',
            country_iso_code2: 'US',
            country_iso_code3: 'USA',
            country_name: 'United States',
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
            edges_alarm_severities: []
        }
    ]


describe('etlTimeSeriesAggregatedAlarmsDataModel', () => {

    it('should correctly ETL TimeSeriesAggregatedAlarmsDataModel when all data sources selected', () => {

        const aggregatedAttrsZipped = [
            [
                "hegemony_alarm_counts",
                "hegemony_alarm_timebins",
                "hegemony_alarm_severities"
            ],
            [
                "network_delay_alarm_counts",
                "network_delay_alarm_timebins",
                "network_delay_alarm_severities"
            ]
        ]
        const countryName = null

        const result = TimeSeriesAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName)

        const expectedResult = [
            {
                x: ['2023-08-10T00:00:00Z', '2023-08-10T00:15:00Z'],
                y: [3, 2],
                type: 'scatter',
                mode: 'lines',
                name: 'All',
                customdata: [
                    { hegemony_alarm_counts: 3, network_delay_alarm_counts: 0 },
                    { hegemony_alarm_counts: 1, network_delay_alarm_counts: 1 }
                ],
                hovertemplate: '<b>%{x|%Y-%m-%d} at %{x|%I:%M %p}</b><br>Total Alarm Counts: %{y}<br>Hegemony Alarm Counts: %{customdata.hegemony_alarm_counts}<br>Network Delay Alarm Counts: %{customdata.network_delay_alarm_counts}<br>'
            },
            {
                x: ['2023-08-10T00:00:00Z', '2023-08-10T00:15:00Z'],
                y: [2, 1],
                type: 'scatter',
                mode: 'lines',
                name: 'Romania',
                customdata: [
                    { hegemony_alarm_counts: 2, network_delay_alarm_counts: 0 },
                    { hegemony_alarm_counts: 1, network_delay_alarm_counts: 0 }
                ],
                hovertemplate: '<b>%{x|%Y-%m-%d} at %{x|%I:%M %p}</b><br>Total Alarm Counts: %{y}<br>Hegemony Alarm Counts: %{customdata.hegemony_alarm_counts}<br>Network Delay Alarm Counts: %{customdata.network_delay_alarm_counts}<br>',
                visible: 'legendonly',
                hoverinfo: 'none'
            },
            {
                x: ['2023-08-10T00:00:00Z', '2023-08-10T00:15:00Z'],
                y: [1, 1],
                type: 'scatter',
                mode: 'lines',
                name: 'Russia',
                customdata: [
                    { hegemony_alarm_counts: 1, network_delay_alarm_counts: 0 },
                    { hegemony_alarm_counts: 0, network_delay_alarm_counts: 1 }
                ],
                hovertemplate: '<b>%{x|%Y-%m-%d} at %{x|%I:%M %p}</b><br>Total Alarm Counts: %{y}<br>Hegemony Alarm Counts: %{customdata.hegemony_alarm_counts}<br>Network Delay Alarm Counts: %{customdata.network_delay_alarm_counts}<br>',
                visible: 'legendonly',
                hoverinfo: 'none'
            }
        ]

        result.forEach((entry, index) => {
            const expectedEntry = expectedResult[index];
            expect(entry).toEqual(expect.objectContaining(expectedEntry))
        });
    });

    it('should handle empty alarms array', () => {
        const alarms = [];
        const aggregatedAttrsZipped = [
            ["hegemony_alarm_counts", "hegemony_alarm_timebins", "hegemony_alarm_severities"],
            ["network_delay_alarm_counts", "network_delay_alarm_timebins", "network_delay_alarm_severities"]
        ];
        const countryName = null;

        const result = TimeSeriesAggregatedAlarmsDataModel.etl(alarms, aggregatedAttrsZipped, countryName);

        expect(result).toEqual([]);
    });

    it('should handle empty aggregatedAttrsZipped array', () => {
        const aggregatedAttrsZipped = [];
        const countryName = null;

        const result = TimeSeriesAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName);

        expect(result).toEqual([]);
    });

    it('should handle non-nullable countryName', () => {
        const countryName = 'Romania'
        const aggregatedAttrsZipped = [
            ["hegemony_alarm_counts", "hegemony_alarm_timebins", "hegemony_alarm_severities"]
        ];

        const result = TimeSeriesAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName);

        const expectedResult = [
            {
                x: ['2023-08-10T00:00:00Z', '2023-08-10T00:15:00Z'],
                y: [2, 1],
                type: 'scatter',
                mode: 'lines',
                name: 'All',
                customdata: [
                    { hegemony_alarm_counts: 2 },
                    { hegemony_alarm_counts: 1 },
                ],
                hovertemplate: '<b>%{x|%Y-%m-%d} at %{x|%I:%M %p}</b><br>Total Alarm Counts: %{y}<br>Hegemony Alarm Counts: %{customdata.hegemony_alarm_counts}<br>'
            },
            {
                x: ['2023-08-10T00:00:00Z', '2023-08-10T00:15:00Z'],
                y: [2, 1],
                type: 'scatter',
                mode: 'lines',
                name: 'CONNETRO-AS CONNET -...',
                customdata: [
                    { hegemony_alarm_counts: 2 },
                    { hegemony_alarm_counts: 1 },
                ],
                hovertemplate: '<b>%{x|%Y-%m-%d} at %{x|%I:%M %p}</b><br>Total Alarm Counts: %{y}<br>Hegemony Alarm Counts: %{customdata.hegemony_alarm_counts}<br>',
                visible: 'legendonly',
                hoverinfo: 'none'
            }
        ]

        result.forEach((entry, index) => {
            const expectedEntry = expectedResult[index];
            expect(entry).toEqual(expect.objectContaining(expectedEntry))
        });
    });

    it("should handle non-existing country", () => {
        const countryName = 'Non-existing Country'
        const aggregatedAttrsZipped = [
            ["hegemony_alarm_counts", "hegemony_alarm_timebins", "hegemony_alarm_severities"]
        ];

        const result = TimeSeriesAggregatedAlarmsDataModel.etl(ALARMS, aggregatedAttrsZipped, countryName);
        expect(result).toEqual([])
    })
})