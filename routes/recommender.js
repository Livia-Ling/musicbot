/**
 * Created by jin on 12/11/2016.
 */
var recommender = function (token) {
    var SpotifyWebApi = require('spotify-web-api-node'),
        appKey = 'a1d9f15f6ba54ef5aea0c5c4e19c0d2c',
        appSecret = 'b368bdb3003747ec861e62d3bf381ba0',
        redirectUrl = 'http://spotifybot.us-3.evennode.com/callback';
        //redirectUrl = 'http://localhost:3000/callback';

    var spotifyApi = new SpotifyWebApi({
        clientId: appKey,
        clientSecret: appSecret,
        redirectUri: redirectUrl
    });

    spotifyApi.setAccessToken(token);

    return {

        getAudioFeatures:function(ids) {
            return spotifyApi.getAudioFeaturesForTracks(ids)
                .then(function(data) {
                    return data.body
                }, function(err) {
                    return err
                });
        },

        getGenresForArtists:function(ids) {
            return spotifyApi.getArtists([ids])
                .then(function(data) {
                    return data.body
                }, function(err) {
                    return err
                });
        },


        getFollowedArtists: function (limitNum){
            return spotifyApi.getFollowedArtists({
                type: 'artist',
                limit: limitNum,
            }).then(function (data) {
                return data.body.artists.items
            }, function (err) {
                return err;
            });
        },

        getArtistRelatedArtists: function (id){
            return spotifyApi.getArtistRelatedArtists(id).then(function (data){
                return data.body.artists
            }, function (err) {
                return err
            })
        },

        getTopArtists: function (limitNum) {
            return spotifyApi.getMyTopArtists({
                time_range: 'long_term',
                limit: limitNum,
            }).then(function (data) {
                return data.body.items
            }, function (err) {
                return err;
            });
        },

        getTopTracks: function (limitNum) {
            return spotifyApi.getMyTopTracks({
                time_range: 'long_term',
                limit: limitNum,
            }).then(function (data) {
                return data.body.items
            }, function (err) {
                return err;
            });
        },

        getTopGenres: function () {
            return spotifyApi.getAvailableGenreSeeds()
                .then(function (data) {
                    return data.body.genres
                }, function (err) {
                    return err
                })
        },

        getRecommendationByFollowedArtist: function (artists, country) {
            var promise = []

            for (var index in artists){
                promise[index]=spotifyApi.getArtistTopTracks(artists[index].id, country).then(function(data){
                    return data.body.tracks
                }), function (err) {
                    return err
                }
            }

            return Promise.all(promise).then(function(data){
                var recommendations = []
                for (var index in data){
                    recommendations = recommendations.concat(data[index])
                }
                // console.log(recommendations)
                return recommendations
            })
        },


        getRecommendation: function (artistSeeds, trackSeeds, genreSeeds, min_valence, max_valence,target_valence,target_energy,
            target_danceability,target_liveness,target_speechiness,target_popularity,min_tempo,max_tempo) {
            var setting = {}
            setting.limit = 50
            if(artistSeeds)
                setting.seed_artists = artistSeeds
            if(trackSeeds)
                setting.seed_tracks = trackSeeds
            if(genreSeeds)
                setting.seed_genres = genreSeeds
            if(min_valence)
                setting.min_valence = min_valence
            if(target_valence)
                setting.target_valence = target_valence
            if(max_valence)
                setting.max_valence = max_valence
            if(target_energy)
                setting.target_energy = target_energy
            if(target_danceability)
                setting.target_danceability = target_danceability
            if(target_liveness)
                setting.tartget_liveness = target_liveness
            if(target_speechiness)
                setting.target_speechiness = target_speechiness
            if(target_popularity)
                setting.target_popularity = target_popularity
            if(min_tempo)
                setting.min_tempo = min_tempo
            if(max_tempo)
                setting.max_tempo = max_tempo

            return spotifyApi.getRecommendations(setting).then(function (data) {
                return data.body.tracks
            }, function (err) {
                return err;
            })
        },


        getRecommendationByArtist: function (limitNum, seeds, min_danceability, max_danceability,
                                             min_energy, max_energy, min_instrumentalness, max_instrumentalness, min_liveness, max_liveness,
                                             min_speechiness, max_speechiness, min_valence,max_valence) {
            return spotifyApi.getRecommendations({
                limit: limitNum,
                seed_artists: seeds,
                min_danceability: min_danceability,
                max_danceability: max_danceability,
                min_energy: min_energy,
                max_energy: max_energy,
                min_instrumentalness: min_instrumentalness,
                max_instrumentalness: max_instrumentalness,
                min_liveness: min_liveness,
                max_liveness: max_liveness,
                min_speechiness: min_speechiness,
                max_speechiness: max_speechiness,
                min_valence: min_valence,
                max_valence: max_valence
            }).then(function (data) {
                return data.body.tracks
            }, function (err) {
                return err;
            })
        },

        getRecommendationByTrack: function (limitNum, seeds, min_danceability, max_danceability,
                                            min_energy, max_energy, min_instrumentalness, max_instrumentalness, min_liveness, max_liveness,
                                            min_speechiness, max_speechiness, min_valence,max_valence) {
            return spotifyApi.getRecommendations({
                limit: limitNum,
                seed_tracks: seeds,
                min_danceability: min_danceability,
                max_danceability: max_danceability,
                min_energy: min_energy,
                max_energy: max_energy,
                min_instrumentalness: min_instrumentalness,
                max_instrumentalness: max_instrumentalness,
                min_liveness: min_liveness,
                max_liveness: max_liveness,
                min_speechiness: min_speechiness,
                max_speechiness: max_speechiness,
                min_valence: min_valence,
                max_valence: max_valence
            }).then(function (data) {
                return data.body.tracks
            }, function (err) {
                return err;
            })
        },

        getRecommendationByGenre: function (limitNum, seeds, min_danceability, max_danceability,
                                            min_energy, max_energy, min_instrumentalness, max_instrumentalness, min_liveness, max_liveness,
                                            min_speechiness, max_speechiness, min_valence,max_valence) {
            return spotifyApi.getRecommendations({
                limit: limitNum,
                seed_genres: seeds,
                min_danceability: min_danceability,
                max_danceability: max_danceability,
                min_energy: min_energy,
                max_energy: max_energy,
                min_instrumentalness: min_instrumentalness,
                max_instrumentalness: max_instrumentalness,
                min_liveness: min_liveness,
                max_liveness: max_liveness,
                min_speechiness: min_speechiness,
                max_speechiness: max_speechiness,
                min_valence: min_valence,
                max_valence: max_valence
            }).then(function (data) {
                return data.body.tracks
            }, function (err) {
                return err;
            })
        },

        getCategories: function () {
            return spotifyApi.getCategories({
                limit: 50
            })
                .then(function(data) {
                    return data.body.categories;
                }, function(err) {
                    return err
                });
        },

        getPlaylistByCategory: function (category) {
            return spotifyApi.getPlaylistsForCategory(category,
                {}
            )
            .then(function(data) {
                return data.body;
            }, function(err) {
                return err
            });

        },

        getPlaylistTracks: function (id) {
            return spotifyApi.getPlaylistTracks(id, {
                fields:"items(track(artists,id,name,popularity,preview_url))"
            })
            .then(
            function(data) {
                return data.body;
            },
            function(err) {
                return err
            });
        },

        getTracks: function (id) {
            return spotifyApi.getTracks(id,{
            })
            .then(
            function(data) {
                return data.body.tracks;
            },
            function(err) {
                return err
            });
        },

        searchTrack: function(text){
            return spotifyApi.searchTracks(text)
            .then(function(data) {
                return data.body;
            }, function(err) {
                return err
            });
        },

        searchArtist: function(text){
            return spotifyApi.searchArtists(text)
            .then(function(data) {
                return data.body;
            }, function(err) {
                return err
            });
        },

        searchPlaylist: function(text){
            return spotifyApi.searchPlaylists(text)
            .then(function(data) {
                return data.body;
            }, function(err) {
                return err
            });
        },

        getArtistTopTracks: function(artist, country){
            return spotifyApi.getArtistTopTracks(artist, country)
            .then(function(data){
                return data.body;
            }, function (err) {
                return err
            });
        },

        getPlaylist: function(id){
            return spotifyApi.getPlaylist(id)
            .then(function(data) {
                return data.body;
            }, function(err) {
                return err
            });
        }

    }
};


module.exports = recommender;
