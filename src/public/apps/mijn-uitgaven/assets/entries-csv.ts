const entriesCsv = `entryId;date;amount;payment_method;description;categoryId
1;20150530;85.14;PIN-betaling;Haan ALMERE;4
2;20150530;28.09;PIN-betaling;T Zuivelhoekje WAGENINGE;2
3;20150530;13.25;PIN-betaling;Thedinghsweert Zorg KERK;2
4;20150530;3.7;PIN-betaling;Thedinghsweert Zorg KERK;2
5;20150530;9;PIN-betaling;Vish. A. Rosendaal VEENE;2
6;20150530;25;PIN-betaling;WILLEMS AGF OPHEUSDEN;2
7;20150601;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
8;20150601;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
9;20150604;6.5;PIN-betaling;CCV*TOKO CHINA ARNHEM AR;2
10;20150604;23.5;PIN-betaling;Lazuur FoodCommunity WAG;2
11;20150604;184;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
12;20150605;7.68;PIN-betaling;Blokker124Wageningen WAG;2
13;20150605;37.5;PIN-betaling;Chutney Express WAGENING;15
14;20150605;18.25;PIN-betaling;Columbus WAGENINGEN;2
15;20150605;25;PIN-betaling;HEMA Wageningen WAGENING;2
16;20150605;7.6;PIN-betaling;HEMA Wageningen WAGENING;2
17;20150605;43;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
18;20150605;520;overboeking;IBAN: NL29RABO0144691426        BIC: RABONL2U                    Naam: Houtmix                   Omschrijving: fact.nr. 11111;5
19;20150606;41.09;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
20;20150606;35;PIN-betaling;CCV*KWEKERIJ DEPENDENS B;16
21;20150606;12.81;PIN-betaling;Lazuur FoodCommunity WAG;2
22;20150606;11.68;PIN-betaling;T Zuivelhoekje WAGENINGE;2
23;20150606;6.75;PIN-betaling;Welkoop WAGENINGEN;16
24;20150606;22.35;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
25;20150606;50;geldautomaat;ING WAGENINGEN;2
26;20150611;13.06;PIN-betaling;Lazuur FoodCommunity WAG;2
27;20150611;93.61;PIN-betaling;Tango Tiel TIEL;4
28;20150611;237.38;overboeking;IBAN: NL05ABNA0539905089        BIC: ABNANL2A                    Naam: J VAN DE BLAAK ZN BV      Omschrijving: fact.nr.201500000  deb.nr.00000;1
29;20150612;4.95;PIN-betaling;AH to go Bijlmer5833 AMS;15
30;20150612;4.7;PIN-betaling;Lazuur FoodCommunity WAG;2
31;20150612;5;PIN-betaling;P&R Transferium P1 4 AMS;4
32;20150612;1;PIN-betaling;P1 ArenA AMSTERDAM ZUI;4
33;20150612;5.5;PIN-betaling;TOKO MIN WAGENINGEN;2
34;20150613;2.65;PIN-betaling;Stolk BV WAGENINGEN;2
35;20150613;13.55;PIN-betaling;Thedinghsweert Zorg KERK;2
36;20150613;70;geldautomaat;ING WAGENINGEN;2
37;20150615;4.8;PIN-betaling;HEMA Wageningen WAGENING;2
38;20150615;3;PIN-betaling;HEMA Wageningen WAGENING;2
39;20150615;4.65;PIN-betaling;TOKO MIN WAGENINGEN;2
40;20150617;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
41;20150617;19.39;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
42;20150620;83.59;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
43;20150620;17.6;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
44;20150622;119.91;iDEAL;IBAN: NL63ABNA0598143912        BIC: ABNANL2A                    Naam: WEHKAMP FINANCE BV        Omschrijving: 12345678765 Vooruitbetaling Wehkamp       Kenmerk: xxxxxxxxxxxxxxxxx14:14 12345678765;5
45;20150625;6.7;PIN-betaling;TOKO MIN WAGENINGEN;2
46;20150625;83.47;PIN-betaling;Total Middelburg MIDDELB;4
47;20150625;16.25;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
48;20150625;25.46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
49;20150626;150;geldautomaat;RABOBANK VALLEI EN RIJ;2
50;20150626;126;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157976;1
51;20150629;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 06-2015               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI CJ;1
52;20150629;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445597;4
53;20150630;59.95;iDEAL;IBAN: NL51ABNA0565668625        BIC: ABNANL2A                    Naam: STG ADYEN                 Omschrijving: 12345678765 Bedankt voor uw bestelling 000965FonqNL          Kenmerk: xxxxxxxxxxxxxxxxx15:49 12345678765;5
54;20150701;5.38;PIN-betaling;1067 action WAGENINGEN;2
55;20150701;37.74;PIN-betaling;Lazuur FoodCommunity WAG;2
56;20150701;11.4;PIN-betaling;TOKO MIN WAGENINGEN;2
57;20150701;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
58;20150701;184;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
59;20150703;8.89;PIN-betaling;Lazuur FoodCommunity WAG;2
60;20150703;10.8;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
61;20150703;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
62;20150704;34.7;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
63;20150704;18.25;PIN-betaling;Columbus WAGENINGEN;2
64;20150706;4.89;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
65;20150706;43;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
66;20150706;56.1;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: ZIGGO SERVICES BV          Machtiging: xxxxxxxxxxxxxxxxx                     Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: xxxxxxxxxxx;14
67;20150708;13.39;PIN-betaling;Lazuur FoodCommunity WAG;2
68;20150709;30.02;PIN-betaling;ESSO 't Loo WEZEP;4
69;20150709;136.89;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: VITENS NV                  Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Factuurnr 222333444555666 VNKlantnr 999999999999 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: xxxxxxxxxxx;1
70;20150710;4.99;PIN-betaling;Blokker124Wageningen WAG;2
71;20150710;73.19;PIN-betaling;TINQ BENNEKOM, DREESLA B;4
72;20150711;30;geldautomaat;RABOBANK VALLEI EN RIJ;2
73;20150713;63.5;Acceptgiro;IBAN: NL75INGB0000259600        BIC: INGBNL2A                    Naam: VPRO                      Betalingskenm.: 0987654321;18
74;20150715;36.44;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
75;20150716;8.54;PIN-betaling;520 Hoogvliet 04 WAGENIN;2
76;20150717;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
77;20150718;18.19;PIN-betaling;Lazuur FoodCommunity WAG;2
78;20150718;5.5;PIN-betaling;TOKO MIN WAGENINGEN;2
79;20150718;7;PIN-betaling;Windkorenmolen Vlijt WAG;2
80;20150718;24.05;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
81;20150719;87.32;PIN-betaling;Haan Almere ALMERE;4
82;20150720;11.5;PIN-betaling;HEMA Wageningen WAGENING;2
83;20150720;19.8;PIN-betaling;T Zuivelhoekje WAGENINGE;2
84;20150722;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
85;20150722;7.25;PIN-betaling;Lazuur FoodCommunity WAG;2
86;20150722;2;PIN-betaling;Lazuur FoodCommunity WAG;2
87;20150724;2.6;PIN-betaling;HEMA Wageningen WAGENING;2
88;20150724;17.24;PIN-betaling;Lazuur FoodCommunity WAG;2
89;20150724;13.68;PIN-betaling;T Zuivelhoekje WAGENINGE;2
90;20150724;126;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157965;1
91;20150727;25.71;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
92;20150727;41.86;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GBLT                       Machtiging: xxxxxxxxxxxxxxxxx           Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  0000000                      IBAN: NL82DEUT0319804617;1
93;20150727;58;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445588;4
94;20150728;9.5;PIN-betaling;CCV*WILLYSWARENHUIS NA W;5
95;20150728;12.19;PIN-betaling;Lazuur FoodCommunity WAG;2
96;20150729;4.2;PIN-betaling;1067 action WAGENINGEN;2
97;20150729;9.75;PIN-betaling;HEMA Wageningen WAGENING;2
98;20150730;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 07-2015               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
99;20150801;3.99;PIN-betaling;520 Hoogvliet 06 WAGENIN;2
100;20150801;51.94;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
101;20150801;24.95;PIN-betaling;CCV*RAVEN BAGS LUGGAGE W;18
102;20150802;110;PIN-betaling;LE POMMIER RUSTIQUE SP D;10
103;20150802;23;PIN-betaling;LE POMMIER RUSTIQUE SP D;10
104;20150803;17.66;PIN-betaling;SPAR DINANT DINANT;2
105;20150803;250;geldautomaat;Fortis bank DINANT;10
106;20150803;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 0000000                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
107;20150803;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
108;20150804;21.35;PIN-betaling;CREA SCRIBE NAMUR;18
109;20150805;17.67;PIN-betaling;NEMERLIN LUDIVINE YVOIR ;10
110;20150805;184;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
111;20150806;29.78;PIN-betaling;AU PANIER DE VICTOR SP Y;5
112;20150808;62.81;PIN-betaling;CADO N 1 HUY;3
113;20150810;3.46;PIN-betaling;Lazuur FoodCommunity WAG;2
114;20150810;4.4;PIN-betaling;TOKO MIN WAGENINGEN;2
115;20150811;12.95;PIN-betaling;La Colombe boekh. ARNHEM;13
116;20150813;10.58;PIN-betaling;520 Hoogvliet 02 WAGENIN;2
117;20150813;33.75;PIN-betaling;HEMA Wageningen WAGENING;2
118;20150813;31.49;PIN-betaling;Lazuur FoodCommunity WAG;2
119;20150815;4.28;PIN-betaling;Lazuur FoodCommunity WAG;2
120;20150816;19.85;iDEAL;IBAN: NL35RABO0117713678        BIC: RABONL2U                    Naam: Stichting Pay.nl          Omschrijving: 12345678765 De Koffiethuiswinkel                       Kenmerk: xxxxxxxxxxxxxxxxx12:51 12345678765;18
121;20150817;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
122;20150818;6.95;PIN-betaling;520 HOOGVLIET 70 WAGENIN;2
123;20150819;32.45;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
124;20150819;9.98;PIN-betaling;Lazuur FoodCommunity WAG;2
125;20150819;7.85;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
126;20150820;15.69;PIN-betaling;Lazuur FoodCommunity WAG;2
127;20150820;123.01;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: VITENS NV                  Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Factuurnr 222333444555666 VNKlantnr 99988877766545666 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: xxxxxxxxxxx;1
128;20150821;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
129;20150822;9.95;PIN-betaling;Profile Peerenboom WAGEN;18
130;20150822;23.55;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
131;20150822;20;geldautomaat;RABOBANK VALLEI EN RIJ;2
132;20150823;4.99;PIN-betaling;520 Hoogvliet 01 WAGENIN;2
133;20150823;27.78;PIN-betaling;520 Hoogvliet 02 WAGENIN;2
134;20150825;10.18;PIN-betaling;Welkoop WAGENINGEN;16
135;20150825;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157966;1
136;20150826;30.97;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
137;20150826;18.25;PIN-betaling;Columbus WAGENINGEN;2
138;20150826;41.86;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GBLT                       Machtiging: xxxxxxxxxxxxxxxxx           Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804615;1
139;20150827;79.95;PIN-betaling;TINQ WAGENINGEN NUDE WAG;4
140;20150827;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445595;4
141;20150827;998.25;overboeking;IBAN: NL83TRIO0390238759        BIC: TRIONL2U                    Naam: Meubelmakerij Marang      Omschrijving: rekening 0000000;5
142;20150828;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 08-2015               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI CJ;1
143;20150829;10.36;PIN-betaling;Keijzer & Van Santen WAG;2
144;20150901;38.67;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
145;20150901;7.19;PIN-betaling;Lazuur FoodCommunity WAG;2
146;20150901;23.6;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
147;20150901;107.9;iDEAL;IBAN: NL64RABO0376807334        BIC: RABONL2U                    Naam: VZR Trading B.V.          Omschrijving: 12345678765 Bestelling Zonweringstunter zonweringstunter.nl             Kenmerk: xxxxxxxxxxxxxxxxx10:02 12345678765;5
148;20150901;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
149;20150901;184;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
150;20150901;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
151;20150905;20;geldautomaat;RABOBANK VALLEI EN RIJ;2
152;20150906;12.57;PIN-betaling;520 Hoogvliet 06 WAGENIN;2
153;20150907;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
154;20150908;19;PIN-betaling;HEMA Wageningen WAGENING;2
155;20150908;4.35;PIN-betaling;HEMA Wageningen WAGENING;2
156;20150909;7.4;PIN-betaling;1067 action WAGENINGEN;2
157;20150910;7.5;PIN-betaling;HEMA Wageningen WAGENING;2
158;20150910;8.4;PIN-betaling;Windkorenmolen Vlijt WAG;2
159;20150912;22;PIN-betaling;HEMA Wageningen WAGENING;2
160;20150912;59.13;PIN-betaling;Lazuur FoodCommunity WAG;2
161;20150912;6.7;PIN-betaling;Thedinghsweert Zorg KERK;2
162;20150912;81.4;PIN-betaling;TINQ WAGENINGEN NUDE WAG;4
163;20150912;10.8;PIN-betaling;TOKO MIN WAGENINGEN;2
164;20150915;6.95;PIN-betaling;Profile Peerenboom WAGEN;18
165;20150916;26.3;PIN-betaling;Lazuur FoodCommunity WAG;2
166;20150917;93.19;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
167;20150919;16.7;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
168;20150919;20.58;PIN-betaling;Lazuur FoodCommunity WAG;2
169;20150919;11.24;PIN-betaling;T Zuivelhoekje WAGENINGE;2
170;20150919;3.95;PIN-betaling;Windkorenmolen Vlijt WAG;2
171;20150924;32.65;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
172;20150924;78.46;PIN-betaling;Lazuur FoodCommunity WAG;2
173;20150925;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
174;20150925;41.86;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GBLT                       Machtiging: xxxxxxxxxxxxxxxxx           Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804620;1
175;20150925;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157967;1
176;20150925;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157968;1
177;20150926;21.2;PIN-betaling;Columbus WAGENINGEN;2
178;20150926;10;PIN-betaling;KWIK FIT CENTER 352 WAGE;4
179;20150926;75.86;PIN-betaling;TINQ BENNEKOM - DREESL B;4
180;20150928;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445598;4
181;20150928;16.25;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
182;20150928;25.46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
183;20150929;12.95;PIN-betaling;ANWB VKPT0080 MIDDELBURG;3
184;20150929;4.2;PIN-betaling;Gemeente Middelburg MIDD;4
185;20150929;2.3;PIN-betaling;Gemeente Middelburg MIDD;4
186;20150929;5.7;PIN-betaling;PRIMERA BURGER MIDDELBUR;18
187;20150929;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 09-2015               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
188;20150930;73.93;overboeking;IBAN: NL91INGB0692710981        BIC: INGBNL2A                    Naam: Van den Dikkenberg - van de Kraats                         Omschrijving: factuurnr. 00000000;6
189;20151001;24.7;PIN-betaling;Lazuur FoodCommunity WAG;2
190;20151001;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
191;20151001;184;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
192;20151001;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
193;20151002;22;PIN-betaling;HEMA Wageningen WAGENING;2
194;20151003;4.49;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
195;20151004;78.41;PIN-betaling;Tango Bennekom BENNEKOM ;4
196;20151006;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
197;20151007;25.55;PIN-betaling;Lazuur FoodCommunity WAG;2
198;20151007;79.25;PIN-betaling;Sauna de Veluwe 'S-GRAVE;10
199;20151007;8.85;PIN-betaling;TOKO MIN WAGENINGEN;2
200;20151008;26;PIN-betaling;HEMA Wageningen WAGENING;2
201;20151008;56.1;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: ZIGGO SERVICES BV          Machtiging: xxxxxxxxxxxxxxxxx                     Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: xxxxxxxxxxx;14
202;20151009;70.76;overboeking;IBAN: NL92RABO0100961819        BIC: RABONL2U                    Naam: Rothuizen-Krol            Omschrijving: yyyy/xxxx;1
203;20151010;25;PIN-betaling;Firma P. van Dijk VEENEN;5
204;20151010;8.99;PIN-betaling;GULF VEENENDAAL SMALLE V;4
205;20151014;33.37;PIN-betaling;520 Hoogvliet 02 WAGENIN;2
206;20151014;7.87;PIN-betaling;Blokker124Wageningen WAG;2
207;20151014;14;PIN-betaling;HEMA Wageningen WAGENING;2
208;20151014;17.9;PIN-betaling;Kruiden Al Diwan WAGENIN;2
209;20151014;13.36;PIN-betaling;Lazuur FoodCommunity WAG;2
210;20151014;312.45;PIN-betaling;Thuisin van Dijk VEENEND;5
211;20151015;22;PIN-betaling;HEMA Wageningen WAGENING;2
212;20151015;250;geldautomaat;RABOBANK VALLEI EN RIJ;2
213;20151016;190;geldautomaat;RABOBANK VALLEI EN RIJ;2
214;20151016;1407.78;overboeking;IBAN: NL63RABO0355123002        BIC: RABONL2U                    Naam: Kraan schilders          Omschrijving: Fakt.nr. 11111;6
215;20151018;21.54;PIN-betaling;Lazuur FoodCommunity WAG;2
216;20151019;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
217;20151021;10.19;PIN-betaling;AO Maastricht BV MAASTRI;2
218;20151021;18.25;PIN-betaling;Columbus WAGENINGEN;2
219;20151022;7.05;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
220;20151024;5.67;PIN-betaling;520 Hoogvliet 06 WAGENIN;2
221;20151024;15.77;PIN-betaling;AO Almere BV ALMERE;2
222;20151024;2.5;PIN-betaling;CCV*WILLYSWARENHUIS NA W;5
223;20151024;36.5;PIN-betaling;Lazuur FoodCommunity WAG;2
224;20151024;68.9;PIN-betaling;TINQ WAGENINGEN NUDE WAG;4
225;20151024;14.45;PIN-betaling;TOKO MIN WAGENINGEN;2
226;20151024;70;geldautomaat;SNS BANK WAGENINGEN;2
227;20151026;41.86;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GBLT                       Machtiging: xxxxxxxxxxxxxxxxx           Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804619;1
228;20151026;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157969;1
229;20151027;24;PIN-betaling;HEMA Wageningen WAGENING;2
230;20151027;58;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445589;4
231;20151029;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
232;20151029;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 10-2015               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
233;20151031;291;PIN-betaling;Firma P. van Dijk VEENEN;5
234;20151102;4.71;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
235;20151102;22;PIN-betaling;HEMA Wageningen WAGENING;2
236;20151102;5.29;PIN-betaling;Lazuur FoodCommunity WAG;2
237;20151102;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
238;20151102;184;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
239;20151102;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
240;20151103;142.8;overboeking;IBAN: NL25TRIO0390305278        BIC: TRIONL2U                    Naam: W. Bovendeert             Omschrijving: vleespakket;2
241;20151104;4.82;PIN-betaling;520 Hoogvliet 03 WAGENIN;2
242;20151105;0.79;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
243;20151105;82.75;PIN-betaling;Firezone Renkum RENKUM;4
244;20151105;3.78;PIN-betaling;Ikea bv inz. Duiven DUIV;5
245;20151105;35.89;PIN-betaling;Ikea Duiven DUIVEN;5
246;20151106;5.88;PIN-betaling;1067 action WAGENINGEN;2
247;20151106;18.5;PIN-betaling;CCV*NESPRESSO NEDERLAN A;2
248;20151106;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
249;20151107;13.58;PIN-betaling;De Hoge Born WAGENINGEN ;2
250;20151113;18.53;PIN-betaling;Lazuur FoodCommunity WAG;2
251;20151113;8.44;PIN-betaling;T Zuivelhoekje WAGENINGE;2
252;20151114;22;PIN-betaling;HEMA Wageningen WAGENING;2
253;20151114;6.22;PIN-betaling;Kruidvat 7955 WAGENINGEN;2
254;20151115;12.98;PIN-betaling;IKEA BV/AMERSFOORT AMERS;5
255;20151117;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
256;20151118;250;geldautomaat;RABOBANK VALLEI EN RIJ;2
257;20151119;250;geldautomaat;RABOBANK VALLEI EN RIJ;2
258;20151120;28.06;PIN-betaling;Lazuur FoodCommunity WAG;2
259;20151120;250;geldautomaat;RABOBANK VALLEI EN RIJ;2
260;20151121;57.58;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
261;20151121;6.78;PIN-betaling;GAMMA WAGENINGEN WAGENIN;5
262;20151121;27.7;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
263;20151123;2.58;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
264;20151123;9.38;PIN-betaling;GAMMA WAGENINGEN WAGENIN;5
265;20151123;34.79;iDEAL;IBAN: NL18RABO0117464112        BIC: RABONL2U                    Naam: Floorfriendly             Omschrijving: 11122233344455566 777888 000000000 Floorfriendly                           Kenmerk: xxxxxxxxxxxxxxxxx12:23 123454321;5
266;20151123;20.9;iDEAL;IBAN: NL19DEUT0319821366        BIC: DEUTNL2N                    Naam: Stichting Derdengelden Buckaroo                            Omschrijving: knivesandtools.nl *0000000 KATO Group BV               Kenmerk: xxxxxxxxxxxxxxxxx12:45 1234509876;18
267;20151124;27.94;PIN-betaling;GAMMA WAGENINGEN WAGENIN;5
268;20151125;5.7;PIN-betaling;520 HOOGVLIET 70 WAGENIN;2
269;20151125;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157970;1
270;20151126;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
271;20151126;41.86;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GBLT                       Machtiging: xxxxxxxxxxxxxxxxx           Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  0000000                      IBAN: NL82DEUT0319804618;1
272;20151127;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 11-2015               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
273;20151127;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445596;4
274;20151128;27.95;PIN-betaling;Columbus WAGENINGEN;2
275;20151128;19.85;PIN-betaling;T Zuivelhoekje WAGENINGE;2
276;20151129;4.61;PIN-betaling;520 Hoogvliet 06 WAGENIN;2
277;20151201;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
278;20151201;184;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
279;20151201;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
280;20151203;22;PIN-betaling;HEMA Wageningen WAGENING;2
281;20151203;13.82;PIN-betaling;Lazuur FoodCommunity WAG;2
282;20151203;8.65;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
283;20151207;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
284;20151208;11.38;PIN-betaling;520 Hoogvliet 03 WAGENIN;2
285;20151210;79.66;PIN-betaling;TINQ WAGENINGEN NUDE WAG;4
286;20151212;1.49;PIN-betaling;520 Hoogvliet 05 WAGENIN;2
287;20151212;33.25;PIN-betaling;HEMA Wageningen WAGENING;2
288;20151212;24.8;PIN-betaling;Lazuur FoodCommunity WAG;2
289;20151212;20;geldautomaat;ING WAGENINGEN;2
290;20151215;7.51;PIN-betaling;Lazuur FoodCommunity WAG;2
291;20151217;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
292;20151218;10;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NS GROEP IZ NS REIZIGERS   Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Bestelling  INC. O V/NS-FIETS                      IBAN: NL40ABNA0537879099         Kenmerk: xxxxxxxxxxxxxxxxx          Voor: JAI CJ;4
293;20151219;19;PIN-betaling;HEMA Wageningen WAGENING;2
294;20151220;18.33;PIN-betaling;520 Hoogvliet 02 WAGENIN;2
295;20151221;74.89;PIN-betaling;TINQ WAGENINGEN NUDE WAG;4
296;20151222;540.76;Acceptgiro;IBAN: NL49RABO0347802664        BIC: RABONL2U                    Naam: Univé Dichtbij            Betalingskenm.: 1234567899;1
297;20151223;4.88;PIN-betaling;1067 action WAGENINGEN;2
298;20151223;38.97;PIN-betaling;Lazuur FoodCommunity WAG;2
299;20151223;29.15;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
300;20151224;37;PIN-betaling;HEMA Wageningen WAGENING;2
301;20151224;23.18;PIN-betaling;Lazuur FoodCommunity WAG;2
302;20151224;25;PIN-betaling;T Zuivelhoekje WAGENINGE;2
303;20151224;41.86;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GBLT                       Machtiging: xxxxxxxxxxxxxxxxx           Omschrijving: GBLT incasso Augus tus Zuiveringhef e o Watersysteemhef. e o Gem. Bel Betaalkenmerk  3456789                      IBAN: NL82DEUT0319804616;1
304;20151228;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445593;4
305;20151228;16.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
306;20151228;26.01;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
307;20151228;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157971;1
308;20151229;28.57;PIN-betaling;520 Hoogvliet 02 WAGENIN;2
309;20151229;23.19;PIN-betaling;520 HOOGVLIET 80 WAGENIN;2
310;20151229;22.05;PIN-betaling;Keijzer & Van Santen WAG;2
311;20151229;31.92;PIN-betaling;Lazuur FoodCommunity WAG;2
312;20151229;7.3;PIN-betaling;TOKO MIN WAGENINGEN;2
313;20151229;56.1;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: ZIGGO SERVICES BV          Machtiging: xxxxxxxxxxxxxxxxx                     Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: xxxxxxxxxxx;14
314;20151229;195.89;eenmalige machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BSH Huishoudapparaten BV   Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: /INV/99887766                        IBAN: NL19RBOS0416925766         Kenmerk: xxxxxxxxxxx;5
315;20151230;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
316;20151230;18.25;PIN-betaling;Columbus WAGENINGEN;2
317;20151230;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 12-2015               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
318;20151231;31.65;PIN-betaling;CCV*BAKKERIJ STROOP WAGE;2
319;20160104;26.5;PIN-betaling;HEMA Wageningen WAGENING;2
320;20160104;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
321;20160104;188.5;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
322;20160104;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
323;20160106;14.04;PIN-betaling;Lazuur FoodCommunity WAG;2
324;20160106;8.4;PIN-betaling;T Zuivelhoekje WAGENINGE;2
325;20160106;5.9;PIN-betaling;TOKO MIN WAGENINGEN;2
326;20160107;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
327;20160107;137.62;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: VITENS NV                  Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Factuurnr 222333444555666 VNKlantnr 999999999999999 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: xxxxxxxxxxx;1
328;20160112;31.5;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Goudse Schade12  N.V.                           Machtiging: xxxxxxxxxxxxxxxxx                        Omschrijving: Kenmerk: xxxxxxxxxxxxxxxxxOmschrijving: CompleetVerzekerd ref 444433332222;12
329;20160114;15.5;PIN-betaling;520 Hoogvliet 01 WAGENIN;2
330;20160114;2.95;PIN-betaling;Columbus WAGENINGEN;2
331;20160114;5.42;PIN-betaling;Lazuur FoodCommunity WAG;2
332;20160114;20.23;PIN-betaling;T Zuivelhoekje WAGENINGE;2
333;20160115;24;PIN-betaling;HEMA Wageningen WAGENING;2
334;20160116;6.1;PIN-betaling;Lazuur FoodCommunity WAG;2
335;20160118;43.31;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
336;20160118;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
337;20160120;6.99;PIN-betaling;Blokker124Wageningen WAG;2
338;20160120;13.75;PIN-betaling;HEMA Wageningen WAGENING;2
339;20160120;19.36;PIN-betaling;Lazuur FoodCommunity WAG;2
340;20160120;26.55;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
341;20160124;60.4;Acceptgiro;IBAN: NL88BNGH0285040448        BIC: BNGHNL2G                    Naam: Gemeente Wageningen       Betalingskenm.: 000000000000;1
342;20160125;26.5;PIN-betaling;HEMA Wageningen WAGENING;2
343;20160125;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157972;1
344;20160126;79.91;PIN-betaling;ESSO OVERMAAT ARNHEM;4
345;20160126;13.49;PIN-betaling;Lazuur FoodCommunity WAG;2
346;20160126;21.62;PIN-betaling;T Zuivelhoekje WAGENINGE;2
347;20160127;58;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445594;4
348;20160128;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
349;20160128;769.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 01-2016               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
350;20160129;5.75;PIN-betaling;TOKO MIN WAGENINGEN;2
351;20160130;12;PIN-betaling;AdriaandeSmaakmaker MAAS;2
352;20160201;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
353;20160201;188.5;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
354;20160201;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
355;20160201;39.55;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: REAAL SCHADEVERZEKERING    Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Kenmerk  9999999 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: xxxxxxxxxxx;1
356;20160204;17.23;PIN-betaling;Lazuur FoodCommunity WAG;2
357;20160204;13.3;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
358;20160204;169.1;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: ROUTE MOBIEL               Machtiging: xxxxxxxxxxxxxxxxx     Omschrijving: Je Route Mobiel pr emie met Factuurnummer 00000000000                        IBAN: NL95ABNA0644712163        Kenmerk: xxxxxxxxxxx;4
359;20160205;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
360;20160206;3.99;PIN-betaling;1067 action WAGENINGEN;2
361;20160206;21.25;PIN-betaling;HEMA Wageningen WAGENING;2
362;20160208;72.13;PIN-betaling;SHELL TEN ESSCHEN HEERLE;4
363;20160210;4.66;PIN-betaling;Lazuur FoodCommunity WAG;2
364;20160210;21.01;PIN-betaling;T Zuivelhoekje WAGENINGE;2
365;20160211;339.42;iDEAL;IBAN: NL43RABO0134053281        BIC: RABONL2U                    Naam: CheapTickets              Omschrijving: 12345678765  www.CheapticketsNL                        Kenmerk: xxxxxxxxxxxxxxxxx13:49 12345678765;10
366;20160211;62.6;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NS GROEP IZ NS REIZIGERS   Machtiging: xxxxxxxxxxxxxxxxx  Omschrijving: Bestelling  12345678765                         IBAN: NL40ABNA0537879099         Kenmerk: xxxxxxxxxxxxxxxxx            Voor: JAI CJ;4
367;20160213;1.81;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
368;20160213;18.25;PIN-betaling;Columbus WAGENINGEN;2
369;20160213;8;PIN-betaling;HEMA Wageningen WAGENING;2
370;20160213;18.6;PIN-betaling;Lazuur FoodCommunity WAG;2
371;20160217;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
372;20160219;12;PIN-betaling;HEMA Wageningen WAGENING;2
373;20160219;29.84;PIN-betaling;Lazuur FoodCommunity WAG;2
374;20160219;20.64;PIN-betaling;T Zuivelhoekje WAGENINGE;2
375;20160219;22.2;PIN-betaling;TOKO MIN WAGENINGEN;2
376;20160220;3.37;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
377;20160221;25;PIN-betaling;NS-Ede-Wagening 201 EDE ;4
378;20160224;64.55;PIN-betaling;TINQ WAGENINGEN NUDE WAG;4
379;20160225;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157973;1
380;20160226;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
381;20160226;7.89;PIN-betaling;Lazuur FoodCommunity WAG;2
382;20160226;14.95;PIN-betaling;theater van de bloem WAG;18
383;20160226;725.07;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 02-2016               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
384;20160229;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445590;4
385;20160229;39.55;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: REAAL SCHADEVERZEKERING    Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: xxxxxxxxxxx;1
386;20160301;4.85;PIN-betaling;Lazuur FoodCommunity WAG;2
387;20160301;10.28;PIN-betaling;T Zuivelhoekje WAGENINGE;2
388;20160301;5.85;PIN-betaling;TOKO MIN WAGENINGEN;2
389;20160301;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
390;20160301;188.5;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
391;20160301;14.66;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
392;20160302;13;overboeking;IBAN: NL83RBRB0691438692        BIC: RBRBNL21                    Naam: Mirjam Hessen            Omschrijving: Zand op mijn ziel;13
393;20160303;2.95;PIN-betaling;Columbus WAGENINGEN;2
394;20160303;8;PIN-betaling;HEMA Wageningen WAGENING;2
395;20160303;42.06;PIN-betaling;Lazuur FoodCommunity WAG;2
396;20160303;10.9;PIN-betaling;Windkorenmolen Vlijt WAG;2
397;20160303;11.2;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
398;20160305;27;PIN-betaling;HEMA Wageningen WAGENING;2
399;20160306;14.85;PIN-betaling;AO Rotterdam Centrum ROT;2
400;20160307;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
401;20160311;26.69;PIN-betaling;Lazuur FoodCommunity WAG;2
402;20160312;22.3;PIN-betaling;Lazuur FoodCommunity WAG;2
403;20160312;80.19;PIN-betaling;Tango Maarsbergen MAARSB;4
404;20160312;2.71;PIN-betaling;Windkorenmolen Vlijt WAG;2
405;20160312;50;geldautomaat;ING WAGENINGEN;2
406;20160313;37.95;iDEAL;IBAN: NL30ABNA0524590958        BIC: ABNANL2A                    Naam: STG MOLLIE PAYMENTS       Omschrijving: 87685 47372837889 Graanmolen.com 00000000marmelot                    Kenmerk: xxxxxxxxxxxxxxxxx10:17 12345678765;18
407;20160316;18.25;PIN-betaling;Columbus WAGENINGEN;2
408;20160316;30.02;PIN-betaling;De Oude Tol WAGENINGEN;16
409;20160316;24;PIN-betaling;HEMA Wageningen WAGENING;2
410;20160316;3.5;PIN-betaling;HEMA Wageningen WAGENING;2
411;20160316;15.02;PIN-betaling;Lazuur FoodCommunity WAG;2
412;20160317;27.5;PIN-betaling;Boekhandel Kniphorst WAG;13
413;20160317;202.71;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;10
414;20160319;19.99;PIN-betaling;Blokker124Wageningen WAG;2
415;20160319;5.85;PIN-betaling;GIJ-Wageningen WAGENINGE;18
416;20160319;5;PIN-betaling;TOKO MIN WAGENINGEN;2
417;20160319;21;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
418;20160320;8.44;PIN-betaling;Lazuur FoodCommunity WAG;2
419;20160321;7.96;PIN-betaling;Welkoop WAGENINGEN;16
420;20160322;34.65;PIN-betaling;Lazuur FoodCommunity WAG;2
421;20160322;18.15;PIN-betaling;T Zuivelhoekje WAGENINGE;2
422;20160322;351;Acceptgiro;IBAN: NL88BNGH0285040448        BIC: BNGHNL2G                    Naam: Gemeente Wageningen       Betalingskenm.: 000000000001;1
423;20160325;5.88;PIN-betaling;1067 action WAGENINGEN;2
424;20160325;0.89;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
425;20160325;12;PIN-betaling;HEMA Wageningen WAGENING;2
426;20160325;32.97;PIN-betaling;Lazuur FoodCommunity WAG;2
427;20160326;26.5;PIN-betaling;De Boschhoeve WOLFHEZE;16
428;20160326;5.53;PIN-betaling;Lazuur FoodCommunity WAG;2
429;20160326;23.99;PIN-betaling;Welkoop WAGENINGEN;16
430;20160326;3.95;PIN-betaling;Windkorenmolen Vlijt WAG;2
431;20160328;44.83;overboeking;IBAN: NL91INGB0692710981        BIC: INGBNL2A                    Naam: Van den Dikkenberg - van de Kraats b.v.                    Omschrijving: fact.nr. 16000222;6
432;20160329;4.75;BANK;ABN AMRO Bank N.V.               Prive pakket                3,25PB Betaalpas                0,75 PB Betaalpas                0,75;11
433;20160329;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445591;4
434;20160329;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157974;1
435;20160330;8;PIN-betaling;HEMA Wageningen WAGENING;2
436;20160330;36.25;PIN-betaling;Keijzer & Van Santen WAG;2
437;20160330;10.02;PIN-betaling;Lazuur FoodCommunity WAG;2
438;20160330;725.07;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 03-2016               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI CJ;1
439;20160330;16.61;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
440;20160330;26.01;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: DELA NATURA- EN LEVENSVE   Machtiging: xxxxxxxxxxxxxxxxx    Omschrijving: cooperatie DELA pr emie voor DELA UitvaartPlan polis 0000000           IBAN: NL09RABO0303577010        Kenmerk: xxxxxxxxxxx-201678901234;12
441;20160331;9;PIN-betaling;CCV*WILLYSWARENHUIS NA W;5
442;20160331;250;geldautomaat;ING WAGENINGEN;2
443;20160331;39.55;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: REAAL SCHADEVERZEKERING    Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: xxxxxxxxxxx;1
444;20160401;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
445;20160401;14.69;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
446;20160404;2.7;PIN-betaling;520 Hoogvliet 06 WAGENIN;2
447;20160404;18.7;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: ZIGGO SERVICES BV          Machtiging: xxxxxxxxxxxxxxxxx                     Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: xxxxxxxxxxx;14
448;20160405;17.03;PIN-betaling;Lazuur FoodCommunity WAG;2
449;20160405;74.59;PIN-betaling;Tango Bennekom BENNEKOM ;4
450;20160405;188.5;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
451;20160406;12;PIN-betaling;Parking de Loodsen AMSTE;4
452;20160406;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
453;20160406;48.4;overboeking;IBAN: NL12RABO0192061585        BIC: RABONL2U                    Naam: HvD Autoservice                                Omschrijving: fact.nr. 000;4
454;20160407;2.36;PIN-betaling;Lazuur FoodCommunity WAG;2
455;20160407;10.65;PIN-betaling;T Zuivelhoekje WAGENINGE;2
456;20160407;27.3;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
457;20160407;135.75;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: VITENS NV                  Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Factuurnr 222333444555666 VNKlantnr 99988877766545666 BTW 1.93         IBAN: NL94INGB0000869000        Kenmerk: xxxxxxxxxxx;1
458;20160408;27;PIN-betaling;HEMA Wageningen WAGENING;2
459;20160412;20.33;PIN-betaling;Lazuur FoodCommunity WAG;2
460;20160416;27.2;PIN-betaling;Lazuur FoodCommunity WAG;2
461;20160418;19.85;PIN-betaling;PA ECOBRENT LISBOA;10
462;20160418;250;geldautomaat;RABOBANK VALLEI EN RIJ;2
463;20160418;9.99;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;13
464;20160420;200;geldautomaat;R de Cascais, 884 Malvei;10
465;20160425;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157975;1
466;20160426;19.98;PIN-betaling;EL CORTE INGLES LISB LIS;3
467;20160426;200;geldautomaat;Gare do Oriente, Piso Li;10
468;20160427;58;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445599;4
469;20160428;725.07;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 04-2016               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI  CJ;1
470;20160429;11.12;PIN-betaling;Lazuur FoodCommunity WAG;2
471;20160429;9.81;PIN-betaling;T Zuivelhoekje WAGENINGE;2
472;20160429;39.55;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: REAAL SCHADEVERZEKERING    Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: Kenmerk  098760 Omschrijving  SCHADEPAKKET      POL 11111 WIJZIGING IBAN: NL04ABNA0551256338        Kenmerk: xxxxxxxxxxx;1
473;20160502;4.5;BANK;ABN AMRO Bank N.V.               BetaalGemak E               3,15PB Betaalpas                0,75 PB Betaalpas                0,60;11
474;20160502;16.51;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
475;20160502;49.99;iDEAL;IBAN: NL60RABO0396709478        BIC: RABONL2U                    Naam: Conrad Electronic Benelux BV                               Omschrijving: 12345678765 Conrad Elec tronic Benelux BV               Kenmerk: xxxxxxxxxxxxxxxxx11:18 12345678765;18
476;20160502;29.04;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BNP PARIBAS CARDIF SCH     Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving: 23456789                        IBAN: NL57ABNA0564422940         Kenmerk: xxxxxxxxxxx;1
477;20160502;13.93;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: OHRA SCHADE12   Machtiging: xxxxxxxxxxxxxxxxx Omschrijving: Relatienr: 999999  / Vlgnr:   187 /                       IBAN: NL98INGB0002712510        Kenmerk: xxxxxxxxxxx;4
478;20160503;4.99;PIN-betaling;520 Hoogvliet 01 WAGENIN;2
479;20160503;18.7;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: ZIGGO SERVICES BV          Machtiging: xxxxxxxxxxxxxxxxx                     Omschrijving: 22222     IBAN: NL98INGB0000845745         Kenmerk: xxxxxxxxxxx;14
480;20160504;18.25;PIN-betaling;Columbus WAGENINGEN;2
481;20160504;30;PIN-betaling;HEMA Wageningen WAGENING;2
482;20160504;6.61;PIN-betaling;Keijzer & Van Santen WAG;2
483;20160504;14.16;PIN-betaling;Lazuur FoodCommunity WAG;2
484;20160504;10;PIN-betaling;TOKO MIN WAGENINGEN;2
485;20160506;15.36;PIN-betaling;Lazuur FoodCommunity WAG;2
486;20160506;188.5;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: FBTO ZORG12 NV  Machtiging: xxxxxxxxxxxxxxxxx      Omschrijving: ZORGVERZEKERING RE LNR: xxxxx   IBAN: NL47INGB0000003054        Kenmerk: xxxxxxxxxxx;12
487;20160506;46;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: GREENCHOICE                Machtiging: xxxxxxxxxxxxxxxxx             Omschrijving: Fact Energie  BTW:  21. 7.46                            IBAN: NL18INGB0005309282        Kenmerk: xxxxxxxxxxx;1
488;20160508;76.34;PIN-betaling;Tango Bennekom BENNEKOM ;4
489;20160509;7.5;PIN-betaling;HEMA Wageningen WAGENING;2
490;20160509;6.08;PIN-betaling;Lazuur FoodCommunity WAG;2
491;20160509;12.69;PIN-betaling;T Zuivelhoekje WAGENINGE;2
492;20160510;21.94;PIN-betaling;Welkoop WAGENINGEN;16
493;20160511;47.5;PIN-betaling;520 Hoogvliet 04 WAGENIN;2
494;20160511;7.95;PIN-betaling;DE HAAN WAGENINGEN WAGEN;4
495;20160511;6.13;PIN-betaling;Welkoop WAGENINGEN;16
496;20160514;8.07;PIN-betaling;Lazuur FoodCommunity WAG;2
497;20160517;121.71;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: INT CARD SERVICES          Machtiging: xxxxxxxxxxxxxxxxx   Omschrijving: Incasso apr 2016 b etreffende uw creditcard ICS-klantnummer 000000000            IBAN: NL23ABNA0818769483        Kenmerk: xxxxxxxxxxx;10
498;20160518;29.31;PIN-betaling;Lazuur FoodCommunity WAG;2
499;20160520;1.56;PIN-betaling;520 Hoogvliet 07 WAGENIN;2
500;20160520;28.5;PIN-betaling;HEMA Wageningen WAGENING;2
501;20160521;6.47;PIN-betaling;520 Hoogvliet 03 WAGENIN;2
502;20160521;8.75;PIN-betaling;ALBERT HEIJN 1103 WAGENI;2
503;20160521;11.83;PIN-betaling;Lazuur FoodCommunity WAG;2
504;20160521;12.91;PIN-betaling;T Zuivelhoekje WAGENINGE;2
505;20160521;14;PIN-betaling;Welkoop WAGENINGEN;16
506;20160521;20.05;PIN-betaling;ZAM ZAM Wageningen WAGEN;2
507;20160524;3.99;PIN-betaling;1067 action WAGENINGEN;2
508;20160524;9.13;PIN-betaling;T Zuivelhoekje WAGENINGE;2
509;20160525;132;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: NLE                        Machtiging: xxxxxxxxxxxxxxxxx       Omschrijving:              Termi jnbedrag 1 van 12     BTW: 21.87       FNR0123456789                          IBAN: NL37INGB0003157977;1
510;20160526;4.5;BANK;ABN AMRO Bank N.V.               BetaalGemak E               3,15PB Betaalpas                0,75 PB Betaalpas                0,60;0
511;20160527;4.47;PIN-betaling;Lazuur FoodCommunity WAG;0
512;20160527;59;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: BELASTINGDIENST            Machtiging: xxxxxxxxxxxxxxxxx          Omschrijving: 00-ZZ-00                        MEER INFO WW W.BELASTINGDIENST.NL            IBAN: NL86INGB0002445592;0
513;20160528;18.5;PIN-betaling;HEMA Wageningen WAGENING;0
514;20160528;19.66;PIN-betaling;Lazuur FoodCommunity WAG;0
515;20160528;79.21;PIN-betaling;TINQ WAGENINGEN NUDE WAG;0
516;20160528;50;geldautomaat;ING WAGENINGEN;0
517;20160528;725.07;doorlopende machtiging;Incassant: xxxxxxxxxxxxxxxxx Naam: Hypotheekbank           Machtiging: xxxxxxxxxxxxxxxxxOmschrijving: Verschuldigd bedra g PERIODE 05-2016               IBAN: NL76ABNA0256115761         Kenmerk: xxxxxxxxxxxxxxxxx      Voor: JAI CJ;0`;

export { entriesCsv };