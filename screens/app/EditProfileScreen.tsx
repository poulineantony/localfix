import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { authService, userService } from '../../services';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { useTranslation } from '../../useTranslation';

interface EditProfileScreenProps {
    navigation: any;
    route: any;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation, route }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await authService.getMe();
            console.log('EditProfile Fetch:', response);
            if (response.success && response.data) {
                setName(response.data.name || '');
                setEmail(response.data.email || '');
                setPhone(response.data.phone || '');
                setAvatar(response.data.avatar || '');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch profile details');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleImagePick = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.8,
                maxWidth: 800,
                maxHeight: 800,
            },
            (response: ImagePickerResponse) => {
                if (response.didCancel) {
                    return;
                }
                if (response.errorCode) {
                    Alert.alert('Error', response.errorMessage || 'Failed to pick image');
                    return;
                }
                if (response.assets && response.assets[0]) {
                    setSelectedImage(response.assets[0]);
                }
            }
        );
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Name is required');
            return;
        }

        setLoading(true);
        try {
            // Upload image first if selected
            if (selectedImage) {
                const uploadResponse = await userService.uploadAvatar(selectedImage.uri);
                if (uploadResponse.success && uploadResponse.data?.avatar) {
                    setAvatar(uploadResponse.data.avatar);
                } else if (!uploadResponse.success) {
                    Alert.alert('Warning', 'Failed to upload image, but continuing with profile update');
                }
            }

            // Then update profile
            const response = await userService.updateProfile({
                name,
                email,
            });

            if (response.success) {
                Alert.alert('Success', 'Profile updated successfully', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Error', response.error || 'Failed to update profile');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00F5FF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('profile.edit_profile')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Image */}
                <View style={styles.imageSection}>
                    <View style={styles.imageContainer}>
                        <View style={styles.avatarPlaceholder}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage.uri }} style={styles.avatarImage} />
                            ) : avatar ? (
                                <Image source={{ uri: avatar }} style={styles.avatarImage} />
                            ) : (
                                <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : '👤'}</Text>
                            )}
                        </View>
                        <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick}>
                            <MaterialIcons name="camera-alt" size={20} color="#0A0E27" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changePhotoText}>{t('profile.change_photo')}</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('profile.full_name')}</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="person" size={20} color="rgba(255,255,255,0.5)" />
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder={t('profile.enter_name')}
                                placeholderTextColor="rgba(255,255,255,0.3)"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('profile.email')}</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="email" size={20} color="rgba(255,255,255,0.5)" />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder={t('profile.enter_email')}
                                placeholderTextColor="rgba(255,255,255,0.3)"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('profile.phone')}</Text>
                        <View style={[styles.inputContainer, styles.disabledInput]}>
                            <MaterialIcons name="phone" size={20} color="rgba(255,255,255,0.5)" />
                            <TextInput
                                style={[styles.input, { color: '#CCCCCC' }]} // Improved visibility
                                value={phone}
                                editable={false}
                                selectTextOnFocus={false}
                            />
                            <MaterialIcons name="lock" size={16} color="rgba(255,255,255,0.3)" />
                        </View>
                        <Text style={styles.helperText}>{t('profile.phone_cant_change')}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, loading && styles.disabledButton]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#0A0E27" />
                    ) : (
                        <Text style={styles.saveButtonText}>{t('common.save_changes')}</Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0E27',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#0A0E27',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    content: {
        padding: 20,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 245, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00F5FF',
    },
    avatarText: {
        fontSize: 40,
        color: '#00F5FF',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#00F5FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#0A0E27',
    },
    changePhotoText: {
        color: '#00F5FF',
        fontSize: 14,
        fontWeight: '600',
    },
    form: {
        gap: 24,
        marginBottom: 40,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        gap: 12,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    disabledInput: {
        opacity: 0.7,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    helperText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
        marginLeft: 4,
    },
    saveButton: {
        backgroundColor: '#00F5FF',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00F5FF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
    saveButtonText: {
        color: '#0A0E27',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default EditProfileScreen;
