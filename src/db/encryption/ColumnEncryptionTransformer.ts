import { EncryptionTransformer } from 'typeorm-encrypted';
import { ConfigService, ConfigModule } from '@nestjs/config';

// prevents displaying confidential values to plain-text
// this is a value converter for encryption, what this does is it parses the specified column to encrypted text

const ColumnEncryptionTransformer = new EncryptionTransformer({
  key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: 'ff5ac19190424b1d88f9419ef949ae56',
});

export default ColumnEncryptionTransformer;
