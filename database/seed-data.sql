-- =============================================
-- ✅ Optional Clean Start (Uncomment if needed)
-- =============================================
-- DELETE FROM Walks;
-- DELETE FROM Regions;
-- DELETE FROM Difficulties;

-- =============================================
-- 📊 Seed: Difficulties
-- =============================================
INSERT [dbo].[Difficulties] ([Id], [Name]) VALUES (N'f808ddcd-b5e5-4d80-b732-1ca523e48434', N'Hard');
INSERT [dbo].[Difficulties] ([Id], [Name]) VALUES (N'54466f17-02af-48e7-8ed3-5a4a8bfacf6f', N'Easy');
INSERT [dbo].[Difficulties] ([Id], [Name]) VALUES (N'ea294873-7a8c-4c0f-bfa7-a2eb492cbf8c', N'Medium');
GO

-- =============================================
-- 🌍 Seed: Regions
-- =============================================
INSERT [dbo].[Regions] ([Id], [Code], [Name], [RegionImageUrl]) VALUES 
(N'906cb139-415a-4bbb-a174-1a1faf9fb1f6', N'Riyadh', N'King Salman Park', 'https://images.pexels.com/photos/13918194/pexels-photo-13918194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(N'f7248fc3-2585-4efb-8d1d-1c555f4087f6', N'', N'Auckland', 'https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
(N'14ceba71-4b51-4777-9b17-46602cf66153', N'BOP', N'Bay Of Plenty', NULL),
(N'6884f7d7-ad1f-4101-8df3-7a6fa7387d81', N'NTL', N'Northland', NULL),
(N'f077a22e-4248-4bf6-b564-c7cf4e250263', N'STL', N'Southland', NULL),
(N'cfa06ed2-bf65-4b65-93ed-c9d286ddb0de', N'WGN', N'Wellington', 'https://images.pexels.com/photos/4350631/pexels-photo-4350631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
GO

-- =============================================
-- 🚶 Seed: Walks
-- =============================================
INSERT INTO Walks (Id, Name, Description, LengthInKm, WalkImageUrl, DifficultyId, RegionId) VALUES 
-- Wellington Region
('327aa9f7-26f7-4ddb-8047-97464374bb63', 'Mount Victoria Loop', 'Stunning views of Wellington and harbor.', 3.5, 'https://images.pexels.com/photos/4350631/pexels-photo-4350631.jpeg', '54466F17-02AF-48E7-8ED3-5A4A8BFACF6F','CFA06ED2-BF65-4B65-93ED-C9D286DDB0DE'),
('1cc5f2bc-ff4b-47c0-a475-1add56c6497b', 'Makara Beach Walkway', 'Rugged coastline, views of the Tasman Sea.', 8.2, 'https://images.pexels.com/photos/4350631/pexels-photo-4350631.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','CFA06ED2-BF65-4B65-93ED-C9D286DDB0DE'),
('09601132-f92d-457c-b47e-da90e117b33c', 'Botanic Garden Walk', 'Plants and flowers to admire.', 2.0, 'https://images.pexels.com/photos/4350631/pexels-photo-4350631.jpeg', '54466F17-02AF-48E7-8ED3-5A4A8BFACF6F','CFA06ED2-BF65-4B65-93ED-C9D286DDB0DE'),

-- Auckland Region
('30d654c7-89ac-4704-8333-5065b740150b', 'Mount Eden Summit Walk', 'Panoramic views of the city.', 2.0, 'https://images.pexels.com/photos/5342974/pexels-photo-5342974.jpeg', '54466F17-02AF-48E7-8ED3-5A4A8BFACF6F','F7248FC3-2585-4EFB-8D1D-1C555F4087F6'),
('f7578324-f025-4c86-83a9-37a7f3d8fe81', 'Cornwall Park Walk', 'Trees, gardens, and animals to admire.', 3.0, 'https://images.pexels.com/photos/5342974/pexels-photo-5342974.jpeg', '54466F17-02AF-48E7-8ED3-5A4A8BFACF6F','F7248FC3-2585-4EFB-8D1D-1C555F4087F6'),
('bdf28703-6d0e-4822-ad8b-e2923f4e95a2', 'Takapuna to Milford Coastal Walk', 'Coastal walk with views of Rangitoto Island.', 5.0, 'https://images.pexels.com/photos/5342974/pexels-photo-5342974.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','F7248FC3-2585-4EFB-8D1D-1C555F4087F6'),

-- Nelson Region (Riyadh)
('43132402-3d5e-467a-8cde-351c5c7c5dde', 'Centre of New Zealand Walkway', 'Geographical centre of New Zealand.', 1.0, 'https://images.pexels.com/photos/808466/pexels-photo-808466.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','906CB139-415A-4BBB-A174-1A1FAF9FB1F6'),
('1ea0b064-2d44-4324-91ee-6dd86c91b713', 'Maitai Valley Walk', 'Tranquil river and native bush.', 5.0, 'https://images.pexels.com/photos/808466/pexels-photo-808466.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','906CB139-415A-4BBB-A174-1A1FAF9FB1F6'),
('04ab77f0-e145-4fbf-b641-989df24e5573', 'Boulder Bank Walkway', 'Long narrow bar of rocks in Tasman Bay.', 8.0, 'https://images.pexels.com/photos/808466/pexels-photo-808466.jpeg', 'F808DDCD-B5E5-4D80-B732-1CA523E48434','906CB139-415A-4BBB-A174-1A1FAF9FB1F6'),

-- Bay of Plenty
('b5aa2791-3616-4db6-ab33-c54d03d17f62', 'Mount Maunganui Summit Walk', 'Summit walk with ocean views.', 3.0, 'https://images.pexels.com/photos/808466/pexels-photo-808466.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','14CEBA71-4B51-4777-9B17-46602CF66153'),
('2d9d6604-bef9-4b0a-805d-630240a29595', 'Papamoa Hills Walk', 'Panoramic views through bush/farmland.', 5.0, 'https://images.pexels.com/photos/808466/pexels-photo-808466.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','14CEBA71-4B51-4777-9B17-46602CF66153'),
('135a6e58-969f-47e1-8278-d7fbf2b3bd69', 'White Pine Bush Track', 'Peaceful native flora and fauna.', 2.0, 'https://images.pexels.com/photos/808466/pexels-photo-808466.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','14CEBA71-4B51-4777-9B17-46602CF66153'),

-- Southland
('24ef9346-17e2-467e-bfc0-d062a9042bf1', 'Bluff Hill Walkway', 'Panoramic views of Bluff coastline.', 6.0, 'https://images.pexels.com/photos/2226900/pexels-photo-2226900.jpeg', 'EA294873-7A8C-4C0F-BFA7-A2EB492CBF8C','F077A22E-4248-4BF6-B564-C7CF4E250263'),
('f2b56c63-eb99-475a-881c-278f3da03e3d', 'Kepler Track', 'Famous alpine walk with forest/tussock.', 32.0, 'https://images.pexels.com/photos/2226900/pexels-photo-2226900.jpeg', 'F808DDCD-B5E5-4D80-B732-1CA523E48434','F077A22E-4248-4BF6-B564-C7CF4E250263'),
('a7796ab6-5426-46af-b755-65d9b9e55698', 'Hump Ridge Track', 'Multi-day scenic alpine/forest walk.', 60.0, 'https://images.pexels.com/photos/2226900/pexels-photo-2226900.jpeg', 'F808DDCD-B5E5-4D80-B732-1CA523E48434','F077A22E-4248-4BF6-B564-C7CF4E250263');
GO

-- =============================================
-- 🧪 Optional SELECTs (Comment out for production)
-- =============================================
-- SELECT * FROM Regions;
-- SELECT * FROM Difficulties;
-- SELECT * FROM Walks;
-- SELECT * FROM AspNetRoles;
-- SELECT * FROM AspNetUsers;
